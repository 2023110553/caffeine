import styled from "styled-components";

export const Card = styled.div`
  box-sizing: border-box;
  position: relative;

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

export const NameArea = styled.div`
  grid-area: name;

  display: flex;
  align-items: center;

  gap: 0.75rem;
`;

export const DeleteButton = styled.button`
  box-sizing: border-box;
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;

  width: 1.5rem;
  height: 1.5rem;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 50%;

  background-color: transparent;
  color: #b45309;

  font-size: 0.75rem;

  cursor: pointer;

  &:hover {
    background-color: #f5ede0;
  }
`;

export const Avatar = styled.div`
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

export const NameGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Name = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.txt_brown};

  font-size: 0.9375rem;
  font-weight: 700;
  line-height: 1.40625rem;

  letter-spacing: -0.01875rem;
`;

export const EmployeeNumber = styled.p`
  margin: 0.0625rem 0 0;

  color: ${({ theme }) => theme.colors.txt_muted};

  font-size: 0.6875rem;
  font-weight: 400;
  line-height: 1.03125rem;
`;

export const TypeArea = styled.div`
  grid-area: type;
`;

export const TypeSelect = styled.select`
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

export const HoursArea = styled.div`
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

export const WageArea = styled.div`
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

export const GrossPayArea = styled.div`
  grid-area: gross;

  justify-self: start;
  align-self: center;

  text-align: left;
`;

export const FieldLabel = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.txt_muted};

  font-size: 0.625rem;
  font-weight: 500;
  line-height: 0.9375rem;
`;

export const GrossPay = styled.p`
  margin: 0.1875rem 0 0;

  color: ${({ theme }) => theme.colors.txt_brown};

  font-size: 0.9375rem;
  font-weight: 700;
  line-height: 1.40625rem;

  letter-spacing: -0.01875rem;
`;

export const DetailButtonArea = styled.div`
  grid-area: detail;

  justify-self: start;
  align-self: center;
`;

export const DetailButton = styled.button`
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TaxArea = styled.div`
  grid-area: tax;

  justify-self: start;
  align-self: center;

  text-align: left;
`;

export const TaxValue = styled.p`
  margin: 0.1875rem 0 0;

  color: ${({ $hasTaxOwed }) => ($hasTaxOwed ? "#6d4c9e" : "#3a7d5c")};

  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.3125rem;
`;

export const TaxNote = styled.span`
  margin-left: 0.1875rem;

  color: ${({ theme }) => theme.colors.txt_muted};

  font-size: 0.625rem;
  font-weight: 500;
  line-height: 0.9375rem;
`;
