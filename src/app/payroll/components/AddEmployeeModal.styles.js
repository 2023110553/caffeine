import styled from "styled-components";

export const Content = styled.div`
  width: 100%;

  font-family: "Noto Sans KR", sans-serif;
`;

export const Description = styled.p`
  margin: 0;
  padding-top: 0.375rem;

  color: ${({ theme }) => theme.colors.txt_muted};

  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.3rem;
`;

export const Divider = styled.div`
  width: 100%;
  height: 0.0625rem;

  margin-top: 1.75rem;

  background-color: #e8d9c8;
`;

export const FormArea = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 1.375rem;

  padding-top: 1.5rem;

  /* 공용 Input 크기 보정 */
  > div {
    width: 100%;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.4375rem;
`;

export const FieldLabel = styled.p`
  margin: 0;

  color: #3d251e;

  font-size: 0.78125rem;
  font-weight: 700;
  line-height: 1.171875rem;

  letter-spacing: -0.0078rem;
`;

export const Required = styled.span`
  color: #b45309;
`;

export const TypeCardList = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 0.5rem;
`;

export const TypeCard = styled.button`
  box-sizing: border-box;

  width: 100%;
  height: 4.1625rem;

  flex-shrink: 0;

  display: flex;
  align-items: center;

  gap: 0.75rem;

  padding: 0.75rem 1rem;

  border: 0.05rem solid ${({ $selected }) => ($selected ? "#3d251e" : "#e8d9c8")};

  border-radius: 0.75rem;

  background-color: ${({ $selected }) => ($selected ? "#3d251e" : "#ffffff")};

  text-align: left;

  cursor: pointer;
`;

export const Radio = styled.div`
  box-sizing: border-box;

  width: 1.125rem;
  height: 1.125rem;

  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 0.1rem solid #c4956a;
  border-radius: 50%;
`;

export const RadioDot = styled.div`
  width: 0.4375rem;
  height: 0.4375rem;

  border-radius: 50%;

  background: var(--primary-brand-primary-100, #fdf9f3);
`;

export const TypeContent = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
`;

export const TypeCardLabel = styled.p`
  margin: 0;

  color: ${({ $selected }) => ($selected ? "#fdf9f3" : "#3d251e")};

  font-size: 0.84375rem;
  font-weight: 700;
  line-height: 1.265625rem;

  letter-spacing: -0.016875rem;
`;

export const TypeCardDesc = styled.p`
  margin: 0.125rem 0 0;

  color: ${({ $selected, theme }) =>
    $selected ? "rgba(253, 249, 243, 0.7)" : theme.colors.txt_muted};

  font-size: 0.71875rem;
  font-weight: 400;
  line-height: 1.078125rem;
`;

export const TwoColumn = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 1rem;
`;

export const InputBox = styled.div`
  min-width: 0;
`;

export const HelperText = styled.p`
  margin: 0.3125rem 0 0;

  color: ${({ theme }) => theme.colors.txt_muted};

  font-size: 0.6875rem;
  font-weight: 400;
  line-height: 1.03125rem;
`;

export const ResidentArea = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export const ResidentLabel = styled.div`
  display: flex;
  align-items: center;

  gap: 0.375rem;

  margin-bottom: 0.4375rem;

  color: #3d251e;

  font-size: 0.78125rem;
  font-weight: 700;
`;

export const OptionalBadge = styled.span`
  padding: 0.125rem 0.4375rem;

  border-radius: 1.25rem;

  background-color: #f5ede0;
  color: ${({ theme }) => theme.colors.txt_muted};

  font-size: 0.625rem;
  font-weight: 600;
  line-height: 0.9375rem;
`;

export const ButtonRow = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 190fr 374fr;

  gap: 0.75rem;

  padding-top: 1.5rem;

  > button {
    width: 100%;
    height: 3.0625rem;

    padding: 0.8125rem 0;

    font-size: 0.875rem;
    line-height: 1.3125rem;
  }
`;

export const InsuranceOption = styled.button`
  box-sizing: border-box;

  width: 100%;

  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  padding: 0.75rem 1rem;

  text-align: left;
  cursor: pointer;

  border: 0.05rem solid ${({ $checked }) => ($checked ? "#76B38C" : "#E8D9C8")};

  border-radius: 0.75rem;

  background-color: ${({ $checked }) => ($checked ? "#EAF6EE" : "#FFFFFF")};
`;

export const CheckBox = styled.span`
  box-sizing: border-box;

  width: 1.125rem;
  height: 1.125rem;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0.1rem solid ${({ $checked }) => ($checked ? "#4E9A69" : "#C4956A")};

  border-radius: 0.25rem;

  background-color: ${({ $checked }) => ($checked ? "#4E9A69" : "transparent")};

  color: #ffffff;

  font-size: 0.6875rem;
  font-weight: 700;
  line-height: 1;
`;

export const InsuranceContent = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
`;

export const InsuranceTitle = styled.p`
  margin: 0;

  color: ${({ $checked }) => ($checked ? "#34734B" : "#3D251E")};

  font-size: 0.78125rem;
  font-weight: 700;
  line-height: 1.171875rem;

  letter-spacing: -0.0078125rem;
`;

export const InsuranceDesc = styled.p`
  margin: 0.25rem 0 0;

  color: ${({ $checked }) => ($checked ? "#5F9270" : "#8C6B5A")};

  font-size: 0.6875rem;
  font-weight: 400;
  line-height: 1rem;
`;

export const InsuranceIncluded = styled.div`
  display: flex;
  padding-top: 0.625rem;
  align-items: center;
  gap: 0.375rem;
  align-self: stretch;
  color: #2a6347;
  font-family: var(--Font-familiy-Noto, "Noto Sans KR");
  font-size: 0.71875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5;

  border-top: 0.05rem solid rgba(58, 125, 92, 0.2);
`;

export const SmallCheck = styled.span`
  width: 0.75rem;
  height: 0.75rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.125rem;

  background-color: #22b455;
  color: #ffffff;

  font-size: 0.5rem;
  font-weight: 700;
`;
