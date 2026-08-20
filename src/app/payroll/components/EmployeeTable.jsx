import { useState } from "react";
import styled from "styled-components";
import EmployeeRow from "./EmployeeRow";
import ResignedEmployeeRow from "./ResignedEmployeeRow";

const ACTIVE_COLUMNS = ["직원", "고용 형태", "월 근무시간", "시급", "세전 급여"];
const RESIGNED_COLUMNS = ["직원", "고용 형태", "시급"];

function EmployeeTable({
  employees,
  resignedEmployees,
  onUpdateEmployee,
  onViewPayslip,
  onDeleteEmployee,
}) {
  // 재직자/퇴사자 탭 - 퇴사 처리(soft delete)된 직원도 기록은 남아있어야 하므로 탭으로 구분해 보여준다
  const [tab, setTab] = useState("active");
  const isActiveTab = tab === "active";

  return (
    <Wrapper>
      <ListHeader>
        <TitleRow>
          <Title>{isActiveTab ? "직원 급여 내역" : "퇴사자 리스트"}</Title>
          <CountBadge>{(isActiveTab ? employees : resignedEmployees).length}명</CountBadge>
        </TitleRow>

        <HeaderRight>
          {isActiveTab && <HelperText>입력값을 수정하면 급여가 자동 재계산됩니다</HelperText>}
          <TabGroup>
            <TabButton type="button" $active={isActiveTab} onClick={() => setTab("active")}>
              재직자 ({employees.length})
            </TabButton>
            <TabButton type="button" $active={!isActiveTab} onClick={() => setTab("resigned")}>
              퇴사자 ({resignedEmployees.length})
            </TabButton>
          </TabGroup>
        </HeaderRight>
      </ListHeader>

      <TableHeader $variant={tab}>
        {(isActiveTab ? ACTIVE_COLUMNS : RESIGNED_COLUMNS).map((col) => (
          <span key={col}>{col}</span>
        ))}
      </TableHeader>

      {isActiveTab ? (
        <RowList>
          {employees.map((emp) => (
            <EmployeeRow
              key={emp.employee_id}
              employee={emp}
              onUpdate={onUpdateEmployee}
              onViewPayslip={onViewPayslip}
              onDelete={onDeleteEmployee}
            />
          ))}
        </RowList>
      ) : (
        <RowList>
          {resignedEmployees.map((emp) => (
            <ResignedEmployeeRow key={emp.employee_id} employee={emp} />
          ))}
        </RowList>
      )}

      {isActiveTab && (
        <NoticeBox>
          <span>📋</span>
          <p>
            <strong>원천세 납부 안내:</strong> 3.3% 프리랜서 원천세는 매월 10일까지 납부하셔야
            합니다. 4대보험 정직원의 경우 근로소득 간이세액표 기준으로 자동 계산되며, 소액부징수(월
            1,000원 미만) 시 징수하지 않습니다.
          </p>
        </NoticeBox>
      )}
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

  margin-bottom: 1rem;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;

  gap: 0.625rem;
`;

const Title = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.txt_brown};

  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;

  letter-spacing: -0.02rem;
`;

const CountBadge = styled.span`
  background-color: #f5ede0;
  color: #6b3f30;

  border-radius: 1.25rem;

  padding: 0.1875rem 0.5625rem;

  font-size: 0.6875rem;
  font-weight: 700;
  line-height: 1.03125rem;

  white-space: nowrap;
`;

const HelperText = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.txt_muted};

  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.125rem;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;

  gap: 0.75rem;
`;

const TabGroup = styled.div`
  flex-shrink: 0;

  display: flex;
  align-items: center;
  gap: 0.125rem;

  background-color: #efeae2; /* TODO: theme.js에 없는 값 */
  border-radius: 0.625rem;

  padding: 0.1875rem;
`;

const TabButton = styled.button`
  border: none;
  border-radius: 0.5rem;

  padding: 0.375rem 0.875rem;

  background-color: ${({ $active, theme }) => ($active ? theme.colors.txt_brown : "transparent")};
  color: ${({ $active, theme }) => ($active ? theme.colors.bg_white : "#6b3f30")};

  font-size: 0.78125rem;
  font-weight: 700;
  white-space: nowrap;

  cursor: pointer;
`;

const TABLE_GRID = {
  active: "200fr 220fr 130fr 130fr 160fr",
  resigned: "200fr 220fr 160fr",
};

const TableHeader = styled.div`
  flex-shrink: 0;

  display: grid;

  grid-template-columns: ${({ $variant }) => TABLE_GRID[$variant]};

  gap: 0.75rem;

  padding: 0 1.5rem;

  color: ${({ theme }) => theme.colors.txt_muted};

  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1.03125rem;

  letter-spacing: 0.0275rem;
`;

const RowList = styled.div`
  flex: 1;
  min-height: 0;

  display: flex;
  flex-direction: column;

  gap: 0.5rem;

  padding-top: 0.5rem;

  overflow-y: auto;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NoticeBox = styled.div`
  flex-shrink: 0;

  display: flex;
  align-items: center;
  gap: 0.625rem;

  margin-top: 1.25rem;
  padding: 0.875rem 1.25rem;

  background-color: #f5ede0;

  border: 0.05rem solid #e8d9c8;
  border-radius: 0.75rem;

  color: #6b3f30;

  > span {
    font-size: 1rem;
  }

  > p {
    margin: 0;

    font-size: 0.78125rem;
    font-weight: 400;
    line-height: 1.25rem;
  }

  strong {
    font-weight: 700;
  }
`;

export default EmployeeTable;
