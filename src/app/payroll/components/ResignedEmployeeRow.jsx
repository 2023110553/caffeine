import styled from "styled-components";

// EmployeeRow.jsx와 동일한 라벨 - 퇴사자도 재직 당시 고용 형태를 그대로 보여준다
const EMPLOYMENT_TYPE_LABEL = {
  FULL_TIME: "4대보험 정직원",
  PART_TIME: "단시간 근로자 (주 15시간 미만)",
  FREELANCER: "3.3% 프리랜서",
};

// 퇴사자는 편집/삭제/명세서 조회가 모두 불필요한 과거 기록이라 EmployeeRow와 달리 읽기 전용으로만 표시한다
function ResignedEmployeeRow({ employee }) {
  const { employee_id, name, employment_type, hourly_wage } = employee;

  return (
    <Card>
      <NameArea>
        <Avatar>{name[0]}</Avatar>
        <NameGroup>
          <Name>{name}</Name>
          <EmployeeNumber>직원 #{employee_id} · 퇴사</EmployeeNumber>
        </NameGroup>
      </NameArea>

      <TypeArea>{EMPLOYMENT_TYPE_LABEL[employment_type] ?? employment_type}</TypeArea>

      <WageArea>{hourly_wage != null && hourly_wage !== "" ? `${Number(hourly_wage).toLocaleString()}원` : "-"}</WageArea>
    </Card>
  );
}

const Card = styled.div`
  box-sizing: border-box;

  width: 100%;

  display: grid;
  grid-template-columns: 200fr 220fr 160fr;

  align-items: center;

  padding: 1rem 1.25rem;

  background-color: #f7f2ec; /* TODO: theme.js에 없는 값 - 재직자 행(#ffffff)보다 톤 다운 */

  border: 0.05rem solid #e8d9c8;
  border-radius: 1rem;
`;

const NameArea = styled.div`
  display: flex;
  align-items: center;

  gap: 0.6875rem;
`;

const Avatar = styled.div`
  width: 2.25rem;
  height: 2.25rem;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background-color: #c4b0a0; /* TODO: theme.js에 없는 값 - 재직자 아바타(#c4956a)보다 톤 다운 */
  color: ${({ theme }) => theme.colors.bg_white};

  font-size: 0.8125rem;
  font-weight: 700;
`;

const NameGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Name = styled.p`
  margin: 0;

  color: #8c6b5a; /* TODO: theme.js에 없는 값 - 퇴사자는 텍스트도 톤 다운 */
  text-decoration: line-through;

  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: -0.0175rem;
`;

const EmployeeNumber = styled.p`
  margin: 0.0625rem 0 0;

  color: #b0967e; /* TODO: theme.js에 없는 값 */

  font-size: 0.65625rem;
  font-weight: 400;
`;

const TypeArea = styled.p`
  margin: 0;

  color: #8c6b5a; /* TODO: theme.js에 없는 값 */

  font-size: 0.75rem;
`;

const WageArea = styled.p`
  margin: 0;

  color: #8c6b5a; /* TODO: theme.js에 없는 값 */

  font-size: 0.8125rem;
`;

export default ResignedEmployeeRow;
