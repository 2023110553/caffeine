import styled from "styled-components";
import EmployeeRow from "./EmployeeRow";

const COLUMNS = ["직원", "고용 형태", "월 근무시간", "시급", "세전 급여"];

function EmployeeTable({ employees, onUpdateEmployee }) {
  return (
    <Wrapper>
      <ListHeader>
        <TitleRow>
          <Title>직원 급여 내역</Title>
          <CountBadge>{employees.length}명</CountBadge>
        </TitleRow>
        <HelperText>입력값을 수정하면 급여가 자동 재계산됩니다</HelperText>
      </ListHeader>

      <TableHeader>
        {COLUMNS.map((col) => (
          <span key={col}>{col}</span>
        ))}
      </TableHeader>

      <RowList>
        {employees.map((emp) => (
          <EmployeeRow key={emp.id} employee={emp} onUpdate={onUpdateEmployee} />
        ))}
      </RowList>

      <NoticeBox>
        📋 원천세 납부 안내: 3.3% 프리랜서 원천세는 매월 10일까지 납부하셔야 합니다. 4대보험
        정직원의 경우 근로소득 간이세액표 기준으로 자동 계산되며, 소액부징수(월 1,000원 미만)
        시 징수하지 않습니다.
      </NoticeBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

const ListHeader = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px; /* TODO: design token화 */
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* TODO: design token화 */
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 16px; /* TODO: design token화 */
  font-weight: 700;
`;

const CountBadge = styled.span`
  background-color: #F5EDE0; /* TODO: theme.js에 없는 값 - 요약 카드 note pill과 동일 색 */
  color: #6B3F30; /* TODO: theme.js에 없는 값 - EmployeeRow 상세보기 버튼 글자색과 동일 */
  border-radius: 999px;
  padding: 3px 9px; /* TODO: design token화 */
  font-size: 11px; /* TODO: design token화 */
  font-weight: 700;
`;

const HelperText = styled.p`
  color: #8C6B5A; /* TODO: theme.js에 없는 값 */
  font-size: 12px; /* TODO: design token화 */
`;

const TableHeader = styled.div`
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 200fr 220fr 130fr 130fr 160fr; /* 피그마 실측 px 비율 */
  gap: 12px; /* TODO: design token화 */
  padding: 0 24px 8px; /* TODO: design token화 */
  color: #8C6B5A; /* TODO: theme.js에 없는 값 */
  font-size: 11px; /* TODO: design token화 */
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.colors.bg_gray};
`;

const RowList = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px; /* TODO: design token화 */
  padding-top: 8px; /* TODO: design token화 */
`;

const NoticeBox = styled.p`
  flex-shrink: 0;
  margin-top: 20px; /* TODO: design token화 */
  background-color: #F5EDE0; /* TODO: theme.js에 없는 값 - 요약 카드 note pill과 동일 색 */
  border: 0.8px solid #E8D9C8; /* TODO: theme.js에 없는 값 */
  color: ${({ theme }) => theme.colors.txt_brown};
  border-radius: ${({ theme }) => theme.radius.medium_large};
  padding: 14px 20px; /* TODO: design token화 */
  font-size: 13px; /* TODO: design token화 */
  line-height: 1.5;
`;

export default EmployeeTable;