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
        <GrossPay>{grossPay.toLocaleString()}원</GrossPay>
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
  display: grid;
  grid-template-columns: 1.8fr 1.8fr 1fr 1fr 1.2fr;
  grid-template-areas:
    "name type hours wage gross"
    "detail . . . tax";
  row-gap: 12px; /* TODO: design token화 */
  column-gap: 12px; /* TODO: design token화 */
  align-items: center;
  background-color: #FFFFFF; /* TODO: theme.js에 없는 값 */
  border: 0.8px solid #E8D9C8; /* TODO: theme.js에 없는 값 */
  border-radius: ${({ theme }) => theme.radius.large};
  padding: 18px 24px; /* TODO: design token화 */
`;

const NameArea = styled.div`
  grid-area: name;
  display: flex;
  align-items: center;
  gap: 12px; /* TODO: design token화 */
`;

const Avatar = styled.div`
  width: 38px; /* TODO: design token화 */
  height: 38px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #C4956A; /* TODO: theme.js에 없는 값 - bg_beige와 유사하지만 다름 */
  color: ${({ theme }) => theme.colors.bg_white};
  font-weight: 700;
`;

const NameGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-weight: 600;
  font-size: 15px; /* TODO: design token화 */
`;

const EmployeeNumber = styled.p`
  color: #8C6B5A; /* TODO: theme.js에 없는 값 */
  font-size: 11px; /* TODO: design token화 */
`;

const TypeArea = styled.div`
  grid-area: type;
`;

const TypeSelect = styled.select`
  width: 100%;
  padding: 8px 10px; /* TODO: design token화 */
  border-radius: ${({ theme }) => theme.radius.medium};
  border: 0.8px solid #E8D9C8; /* TODO: theme.js에 없는 값 */
  background-color: ${({ theme }) => theme.colors.bg_white};
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 12px; /* TODO: design token화 */
`;

const HoursArea = styled.div`
  grid-area: hours;
`;

const WageArea = styled.div`
  grid-area: wage;
`;

const GrossPayArea = styled.div`
  grid-area: gross;
  justify-self: end;
  text-align: right;
`;

const FieldLabel = styled.p`
  color: #8C6B5A; /* TODO: theme.js에 없는 값 */
  font-size: 10px; /* TODO: design token화 */
`;

const GrossPay = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 15px; /* TODO: design token화 */
  font-weight: 700;
  margin-top: 3px; /* TODO: design token화 */
`;

const DetailButtonArea = styled.div`
  grid-area: detail;
`;

const DetailButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px; /* TODO: design token화 */
  border: 0.8px solid #C4956A; /* TODO: theme.js에 없는 값 - Avatar와 동일 */
  border-radius: ${({ theme }) => theme.radius.medium};
  background-color: #F5EDE0; /* TODO: theme.js에 없는 값 */
  color: #6B3F30; /* TODO: theme.js에 없는 값 */
  padding: 7px 12px; /* TODO: design token화 */
  font-size: 12px; /* TODO: design token화 */
  cursor: pointer;
`;

const TaxArea = styled.div`
  grid-area: tax;
  justify-self: end;
  text-align: right;
`;

const TaxValue = styled.p`
  font-size: 14px; /* TODO: design token화 */
  font-weight: 700;
  margin-top: 3px; /* TODO: design token화 */
  color: ${({ $hasTaxOwed }) => ($hasTaxOwed ? "#6D4C9E" : "#3A7D5C")}; /* TODO: theme.js에 없는 값 - 세금 발생 여부에 따라 초록/보라 분기 */
`;

const TaxNote = styled.span`
  color: #8C6B5A; /* TODO: theme.js에 없는 값 */
  font-size: 10px; /* TODO: design token화 */
  font-weight: 400;
`;

export default EmployeeRow;