import { useState, useEffect, useRef, useMemo } from "react";
import styled from "styled-components";
import { exportCleanData } from "../../../api/analytics";
import { getClosingSummary } from "../../../api/tax";
import { useBusiness } from "../../../contexts/BusinessContext";
import warningIcon from "../../../assets/warningIcon.svg";

const INCLUDED_ITEMS = [
  { icon: "📋", label: "매출·매입 세금계산서" },
  { icon: "💼", label: "인건비 및 원천세 내역" },
  { icon: "🧾", label: "의제매입세액 공제 내역" },
  { icon: "📊", label: "월별 부가세 추이 그래프" },
];

const getRecentMonths = (baseYear, baseMonth, count = 6) => {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(baseYear, baseMonth - 1 - i, 1);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    return {
      label: `${y}년 ${m}월`,
      year: y,
      month: m,
      yearMonth: `${y}-${String(m).padStart(2, "0")}`,
    };
  });
};

function CleanDataExport({ year, month }) {
  const { business } = useBusiness();
  const recentMonths = useMemo(() => getRecentMonths(year, month), [year, month]);

  const [selected, setSelected] = useState(recentMonths[0]);
  const [isClosed, setIsClosed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!business.businessId) return;

    const loadClosingStatus = async () => {
      try {
        const res = await getClosingSummary(business.businessId, selected.yearMonth);
        setIsClosed(res.data.data.status === "CLOSED");
      } catch {
        setIsClosed(false);
      }
    };
    loadClosingStatus();
  }, [business.businessId, selected.yearMonth]);

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleSelectMonth = (item) => {
    setSelected(item);
    setIsDropdownOpen(false);
  };

  const handleDownload = async (format) => {
    if (!isClosed || downloadingFormat) return;
    setDownloadingFormat(format);
    try {
      const res = await exportCleanData(business.businessId, selected.year, selected.month, format);
      const url = URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `카페비서_${selected.year}년${selected.month}월_세무자료.${format}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      // 마감 승인 전에 호출된 경우 서버에서 409(MONTHLY_CLOSE_REQUIRED)로 막음
      if (err.response?.status === 409) {
        window.alert("장부 마감 승인 이후에 다운로드할 수 있습니다.");
      } else {
        window.alert("자료를 다운로드하는 중 오류가 발생했습니다.");
      }
    } finally {
      setDownloadingFormat(null);
    }
  };

  return (
    <Card>
      <TopRow>
        <TextGroup>
          <Label>세무사 전달용 클린 데이터</Label>
          <Title>자료 내보내기</Title>
          <StatusBadge $closed={isClosed}>
            {!isClosed && <StatusIcon src={warningIcon} alt="" />}
            {isClosed ? "장부 마감 승인 완료" : "장부 마감 승인 대기"}
          </StatusBadge>
        </TextGroup>

        <DropdownWrapper ref={dropdownRef}>
          <DropdownTrigger onClick={() => setIsDropdownOpen((prev) => !prev)}>
            {selected.label} <Chevron $open={isDropdownOpen}>▾</Chevron>
          </DropdownTrigger>
          {isDropdownOpen && (
            <DropdownList>
              {recentMonths.map((item) => (
                <DropdownItem
                  key={item.yearMonth}
                  $active={item.yearMonth === selected.yearMonth}
                  onClick={() => handleSelectMonth(item)}
                >
                  {item.label}
                </DropdownItem>
              ))}
            </DropdownList>
          )}
        </DropdownWrapper>
      </TopRow>

      <IncludedCard>
        <IncludedLabel>포함 항목</IncludedLabel>
        <IncludedGrid>
          {INCLUDED_ITEMS.map((item) => (
            <IncludedItem key={item.label}>
              <span>{item.icon}</span> {item.label}
            </IncludedItem>
          ))}
        </IncludedGrid>
      </IncludedCard>

      <ButtonRow>
        <DownloadButton
          disabled={!isClosed}
          onClick={() => handleDownload("csv")}
        >
          ⬇ {downloadingFormat === "csv" ? "다운로드 중..." : "CSV 다운로드"}
        </DownloadButton>
        <DownloadButton
          disabled={!isClosed}
          onClick={() => handleDownload("pdf")}
        >
          ⬇ {downloadingFormat === "pdf" ? "다운로드 중..." : "PDF 다운로드"}
        </DownloadButton>
      </ButtonRow>

      {!isClosed && <HelperText>장부 마감 승인 이후에 다운로드 가능</HelperText>}
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* TODO: design token화 */
  background-color: #FFFCF8; /* TODO: theme.js에 없는 값 */
  border: 0.8px solid ${({ theme }) => theme.colors.bg_gray};
  border-radius: ${({ theme }) => theme.radius.large};
  padding: 24px; /* TODO: design token화 */
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px; /* TODO: design token화 */
`;

const Label = styled.p`
  color: #9B6E62; /* TODO: theme.js에 없는 값 */
  font-family: Outfit, sans-serif; /* TODO: design token화 */
  font-size: 12px; /* TODO: design token화 */
  font-weight: 500;
  line-height: 16px; /* TODO: design token화 */
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 20px; /* TODO: design token화 */
  font-weight: 700;
  line-height: 28px; /* TODO: design token화 */
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px; /* TODO: design token화 */
  align-self: flex-start;
  background-color: ${({ $closed }) => ($closed ? "#F0E8DC" : "#FFFBEB")}; /* TODO: theme.js에 없는 값 */
  border: 0.8px solid ${({ $closed }) => ($closed ? "#E4D9CC" : "#FDE68A")}; /* TODO: theme.js에 없는 값 */
  color: ${({ $closed, theme }) => ($closed ? theme.colors.txt_brown : "#D97706")}; /* TODO: theme.js에 없는 값 */
  border-radius: 20px; /* TODO: design token화 */
  padding: 4px 11px; /* TODO: design token화 */
  font-family: "Noto Sans KR", sans-serif; /* TODO: design token화 */
  font-size: 11px; /* TODO: design token화 */
  font-weight: 600;
  line-height: 16.5px; /* TODO: design token화 */
`;

const StatusIcon = styled.img`
  width: 8px;
  height: 8px;
`;

const DropdownWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const DropdownTrigger = styled.button`
  display: flex;
  align-items: center;
  gap: 8px; /* TODO: design token화 */
  border: none;
  border-radius: ${({ theme }) => theme.radius.medium_large};
  background-color: ${({ theme }) => theme.colors.txt_brown};
  color: ${({ theme }) => theme.colors.txt_white};
  padding: 12px 16px; /* TODO: design token화 */
  font-size: 16px; /* TODO: design token화 */
  font-weight: 700;
  cursor: pointer;
`;

const Chevron = styled.span`
  display: inline-block;
  transition: transform 0.15s ease;
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
`;

const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  left: 0;
  z-index: 10;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.medium_large};
  background-color: ${({ theme }) => theme.colors.bg_white};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12); /* TODO: theme.js에 없는 값 */
`;

const DropdownItem = styled.li`
  padding: 12px 16px; /* TODO: design token화 */
  font-size: 15px; /* TODO: design token화 */
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  text-align: center;
  cursor: pointer;
  background-color: ${({ $active, theme }) => ($active ? theme.colors.txt_brown : "transparent")};
  color: ${({ $active, theme }) => ($active ? theme.colors.txt_white : theme.colors.txt_brown)};

  &:hover {
    background-color: ${({ $active, theme }) => ($active ? theme.colors.txt_brown : theme.colors.bg_gray)};
  }
`;

const IncludedCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px; /* TODO: design token화 */
  background-color: ${({ theme }) => theme.colors.bg_white};
  border: 0.8px solid ${({ theme }) => theme.colors.bg_gray};
  border-radius: ${({ theme }) => theme.radius.medium_large};
  padding: 16px; /* TODO: design token화 */
`;

const IncludedLabel = styled.p`
  color: #9C6E62; /* TODO: theme.js에 없는 값 */
  font-size: 12px; /* TODO: design token화 */
  font-weight: 600;
`;

const IncludedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px; /* TODO: design token화 */
`;

const IncludedItem = styled.p`
  display: flex;
  align-items: center;
  gap: 8px; /* TODO: design token화 */
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 13px; /* TODO: design token화 */
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 8px; /* TODO: design token화 */
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* TODO: design token화 */
  flex: 1;
  border: none;
  border-radius: ${({ theme }) => theme.radius.medium_large};
  background-color: ${({ theme, disabled }) => (disabled ? theme.colors.bg_gray : theme.colors.txt_brown)}; /* TODO: theme.js에 없는 값 */
  color: ${({ theme }) => theme.colors.txt_white};
  padding: 12px; /* TODO: design token화 */
  font-size: 14px; /* TODO: design token화 */
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const HelperText = styled.p`
  color: #9C6E62; /* TODO: theme.js에 없는 값 */
  font-size: 12px; /* TODO: design token화 */
  text-align: center;
`;

export default CleanDataExport;