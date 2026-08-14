import styled from "styled-components";
import Input from "../../../components/Input";

const EMPLOYMENT_TYPE_LABEL = {
  regular: "4대보험 정직원",
  parttime: "단시간 근로자 (주 15시간 미만)",
  freelancer: "3.3% 프리랜서",
};

const DETAIL_BUTTON_LABEL = {
  regular: "임금명세서 상세",
  parttime: "임금명세서 상세",
  freelancer: "지급내역서 상세",
};

function EmployeeRow({ employee, onUpdate }) {
  const { id, name, employeeNumber, employmentType, hourlyWage, monthlyHours, withholdingTax, withholdingNote } = employee;
  const grossPay = hourlyWage * monthlyHours;
  const hasTaxOwed = withholdingTax > 0;

  return (
    <Card>
      <NameArea>
        <Avatar>{name[0]}</Avatar>
        <NameGroup>
          <Name>{name}</Name>
          <EmployeeNumber>직원 #{employeeNumber}</EmployeeNumber>
        </NameGroup>
      </NameArea>

      <TypeArea>
        <TypeSelect
          value={employmentType}
          onChange={(e) => onUpdate(id, "employmentType", e.target.value)}
        >
          {Object.entries(EMPLOYMENT_TYPE_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </TypeSelect>
      </TypeArea>

      <HoursArea>
        <Input
          type="number"
          unit="시간"
          value={monthlyHours}
          onChange={(e) => onUpdate(id, "monthlyHours", Number(e.target.value))}
        />
      </HoursArea>

      <WageArea>
        <Input
          type="number"
          unit="원"
          value={hourlyWage}
          onChange={(e) => onUpdate(id, "hourlyWage", Number(e.target.value))}
        />
      </WageArea>

      <GrossPayArea>
        <FieldLabel>세전 급여</FieldLabel>
        <GrossPay>{grossPay.toLocaleString()}</GrossPay>
      </GrossPayArea>

      <DetailButtonArea>
        <DetailButton type="button">
          📄 {DETAIL_BUTTON_LABEL[employmentType]} &gt;
        </DetailButton>
      </DetailButtonArea>

      <TaxArea>
        <FieldLabel>원천세</FieldLabel>
        <TaxValue $hasTaxOwed={hasTaxOwed}>
          {withholdingTax.toLocaleString()}원
          {withholdingNote && <TaxNote> ({withholdingNote})</TaxNote>}
        </TaxValue>
      </TaxArea>
    </Card>
  );
}

const Card = styled.div`
  box-sizing: border-box;

  width: 100%;
  min-height: 9.75625rem;

  display: grid;
  grid-template-columns: 200fr 220fr 130fr 130fr 160fr;
  grid-template-areas:
    "name type hours wage gross"
    "detail . . . tax";

  row-gap: 0.75rem;
  column-gap: 0.75rem;

  align-items: center;

  padding: 1.125rem 1.5rem;

  background-color: #ffffff;

  border: 0.05rem solid #e8d9c8;
  border-radius: 1rem;

  box-shadow: 0 0.0625rem 0.09375rem rgba(61, 37, 30, 0.04);
`;

const NameArea = styled.div`
  grid-area: name;

  display: flex;
  align-items: center;

  gap: 0.75rem;
`;

const Avatar = styled.div`
  width: 2.375rem;
  height: 2.375rem;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background-color: #c4956a;
  color: ${({ theme }) => theme.colors.bg_white};

  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.3125rem;

  letter-spacing: -0.0175rem;
`;

const NameGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Name = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.txt_brown};

  font-size: 0.9375rem;
  font-weight: 700;
  line-height: 1.40625rem;

  letter-spacing: -0.01875rem;
`;

const EmployeeNumber = styled.p`
  margin: 0.0625rem 0 0;

  color: #8c6b5a;

  font-size: 0.6875rem;
  font-weight: 400;
  line-height: 1.03125rem;
`;

const TypeArea = styled.div`
  grid-area: type;
`;

const TypeSelect = styled.select`
  box-sizing: border-box;

  width: 100%;
  height: 2.125rem;

  padding: 0 2rem 0 0.625rem;

  border: 0.05rem solid #e8d9c8;
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.colors.bg_white};

  color: ${({ theme }) => theme.colors.txt_brown};

  font-family: "Noto Sans KR", sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.125rem;

  cursor: pointer;
`;

const HoursArea = styled.div`
  grid-area: hours;

  > div {
    width: 100%;
  }

  input {
    height: 2.1875rem;
    padding: 0.4375rem 0.625rem;

    border-radius: 0.5rem;

    font-size: 0.8125rem;
    font-weight: 600;
    line-height: 1.21875rem;
  }
`;

const WageArea = styled.div`
  grid-area: wage;

  > div {
    width: 100%;
  }

  input {
    height: 2.1875rem;
    padding: 0.4375rem 0.625rem;

    border-radius: 0.5rem;

    font-size: 0.8125rem;
    font-weight: 600;
    line-height: 1.21875rem;
  }
`;

const GrossPayArea = styled.div`
  grid-area: gross;

  justify-self: start;
  align-self: center;

  text-align: left;
`;

const FieldLabel = styled.p`
  margin: 0;

  color: #8c6b5a;

  font-size: 0.625rem;
  font-weight: 500;
  line-height: 0.9375rem;
`;

const GrossPay = styled.p`
  margin: 0.1875rem 0 0;

  color: ${({ theme }) => theme.colors.txt_brown};

  font-size: 0.9375rem;
  font-weight: 700;
  line-height: 1.40625rem;

  letter-spacing: -0.01875rem;
`;

const DetailButtonArea = styled.div`
  grid-area: detail;

  justify-self: start;
  align-self: center;
`;

const DetailButton = styled.button`
  box-sizing: border-box;

  height: 2.125rem;

  display: inline-flex;
  align-items: center;

  gap: 0.3125rem;

  padding: 0.4375rem 0.75rem;

  border: 0.05rem solid #c4956a;
  border-radius: 0.5rem;

  background-color: #f5ede0;
  color: #6b3f30;

  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.125rem;

  cursor: pointer;
`;

const TaxArea = styled.div`
  grid-area: tax;

  justify-self: start;
  align-self: center;

  text-align: left;
`;

const TaxValue = styled.p`
  margin: 0.1875rem 0 0;

  color: ${({ $hasTaxOwed }) =>
    $hasTaxOwed ? "#6d4c9e" : "#3a7d5c"};

  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.3125rem;
`;

const TaxNote = styled.span`
  margin-left: 0.1875rem;

  color: #8c6b5a;

  font-size: 0.625rem;
  font-weight: 500;
  line-height: 0.9375rem;
`;
export default EmployeeRow;