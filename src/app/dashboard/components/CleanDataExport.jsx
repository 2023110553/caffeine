import styled from "styled-components";
import { exportCleanData } from "../../../api/analytics";
import { useBusiness } from "../../../contexts/BusinessContext";

const INCLUDED_ITEMS = [
  { icon: "📋", label: "매출·매입 세금계산서" },
  { icon: "💼", label: "인건비 및 원천세 내역" },
  { icon: "🧾", label: "의제매입세액 공제 내역" },
  { icon: "📊", label: "월별 부가세 추이 그래프" },
];

function CleanDataExport({ year, month, isClosed }) {
  const { business } = useBusiness();

  const handleDownload = async (format) => {
    if (!isClosed) return;
    try {
      const res = await exportCleanData(business.businessId, year, month, format);
      const url = URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `카페비서_${year}년${month}월_세무자료.${format}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      // TODO: 409(MONTHLY_CLOSE_REQUIRED) 등 에러 처리
    }
  };

  return (
    <Card>
      <TopRow>
        <TextGroup>
          <Label>세무사 전달용 클린 데이터</Label>
          <Title>자료 내보내기</Title>
          <StatusBadge $closed={isClosed}>
            {isClosed ? "장부 마감 승인 완료" : "장부 마감 승인 대기"}
          </StatusBadge>
        </TextGroup>
        <IconCircle>📤</IconCircle>
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

      <DownloadButton disabled={!isClosed} onClick={() => handleDownload("csv")}>
        ⬇ CSV/PDF 다운로드
      </DownloadButton>

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
  color: #9C6E62; /* TODO: theme.js에 없는 값 */
  font-size: 12px; /* TODO: design token화 */
  font-weight: 500;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 20px; /* TODO: design token화 */
  font-weight: 700;
`;

const StatusBadge = styled.span`
  align-self: flex-start;
  background-color: ${({ $closed }) => ($closed ? "#F0E8DC" : "#FFFBEB")}; /* TODO: theme.js에 없는 값 */
  border: 0.8px solid ${({ $closed }) => ($closed ? "#E4D9CC" : "#FDE68A")}; /* TODO: theme.js에 없는 값 */
  color: ${({ $closed, theme }) => ($closed ? theme.colors.txt_brown : "#D97706")}; /* TODO: theme.js에 없는 값 */
  border-radius: 999px;
  padding: 4px 11px; /* TODO: design token화 */
  font-size: 11px; /* TODO: design token화 */
  font-weight: 600;
`;

const IconCircle = styled.div`
  width: 44px; /* TODO: design token화 */
  height: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.medium_large};
  background-color: ${({ theme }) => theme.colors.bg_gray};
  font-size: 20px; /* TODO: design token화 */
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

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* TODO: design token화 */
  width: 100%;
  border: none;
  border-radius: ${({ theme }) => theme.radius.medium_large};
  background-color: ${({ theme, disabled }) => (disabled ? "#A1A1AA" : theme.colors.txt_brown)}; /* TODO: theme.js에 없는 값 */
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