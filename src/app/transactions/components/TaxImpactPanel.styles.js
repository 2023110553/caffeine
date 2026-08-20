import styled from "styled-components";

export const Wrapper = styled.aside`
  box-sizing: border-box;
  width: 24.005vw;
  height: 100%;
  flex: 0 0 24.005vw;

  display: flex;
  flex-direction: column;

  padding: 3.529vh 1.783vw 3.529vh 1.715vw;

  background-color: #fdf9f3;
  border-left: 0.069vw solid rgba(61, 37, 30, 0.08);

  font-family: "Outfit", sans-serif;

  > button {
    box-sizing: border-box;
    width: 100%;
    min-height: 7.059vh;

    margin-top: 2.353vh;
    padding: 2.059vh 0;

    border: none;
    border-radius: 1.372vw;

    box-shadow: 0 0.588vh 0.686vw rgba(61, 37, 30, 0.25);

    text-align: center;
  }
`;

export const PanelTitle = styled.p`
  box-sizing: border-box;
  width: 100%;
  height: 4.706vh;

  margin: 0;
  padding-bottom: 2.353vh;

  color: #9b6e62;

  font-family: "Outfit", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: 0.075rem;
`;

export const VatBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: ${({ $completed }) => ($completed ? "27.175vh" : "16.765vh")};
  min-height: ${({ $completed }) => ($completed ? "27.175vh" : "16.765vh")};

  display: flex;
  flex-direction: column;

  margin-bottom: 2.353vh;
  padding: 2.941vh 1.715vw;

  border-radius: 1.372vw;

  background: ${({ $completed }) =>
    $completed
      ? `linear-gradient(
          164deg,
          #3d251e 8.5%,
          #5c3327 91.5%
        )`
      : `linear-gradient(
          170deg,
          #3d251e 8.5%,
          #5c3327 91.5%
        )`};
`;

export const Label = styled.p`
  margin: 0;

  color: #c9a882;

  font-family: "Outfit", sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
`;

export const VatAmount = styled.p`
  height: 5.882vh;

  margin: 0;
  padding-top: 0.588vh;

  color: #fdf9f3;

  font-family: "Fraunces", serif;
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 2.25rem;

  white-space: nowrap;
`;

export const SubLabel = styled.p`
  height: 2.647vh;

  margin: 0;
  padding-top: 0.294vh;

  color: rgba(201, 168, 130, 0.7);

  font-family: "Outfit", sans-serif;
  font-size: 0.6875rem;
  font-weight: 400;
  line-height: 1rem;
`;

export const StatGrid = styled.div`
  box-sizing: border-box;
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.029vw;

  margin-top: 2.353vh;
  padding-top: 2.353vh;

  border-top: 0.069vw solid rgba(255, 255, 255, 0.1);
`;

export const StatLabel = styled.p`
  margin: 0;

  color: rgba(201, 168, 130, 0.7);

  font-family: "Outfit", sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;

  white-space: nowrap;
`;

export const StatValue = styled.p`
  height: 3.235vh;

  margin: 0;
  padding-top: 0.294vh;

  color: #fdf9f3;

  font-family: "Outfit", sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.25rem;

  white-space: nowrap;
`;

export const BreakdownTitle = styled.p`
  box-sizing: border-box;
  width: 100%;
  height: 4.824vh;

  margin: 0;
  padding: 2.471vh 1.441vw 0;

  color: #3d251e;
  background-color: #fffcf8;

  border-top: 0.069vw solid rgba(61, 37, 30, 0.07);
  border-right: 0.069vw solid rgba(61, 37, 30, 0.07);
  border-left: 0.069vw solid rgba(61, 37, 30, 0.07);

  border-radius: 1.372vw 1.372vw 0 0;

  font-family: "Outfit", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
`;

export const BreakdownList = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  gap: 1.471vh;

  padding: 1.765vh 1.441vw 0;

  background-color: #fffcf8;

  border-right: 0.069vw solid rgba(61, 37, 30, 0.07);
  border-left: 0.069vw solid rgba(61, 37, 30, 0.07);
`;

export const BreakdownRow = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 3.529v;
  min-height: 3.529vh;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-family: "Outfit", sans-serif;
  font-size: 0.75rem;
  line-height: 1rem;
`;

export const RowLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 0.686vw;

  color: #9b6e62;
  font-weight: 400;

  white-space: nowrap;
`;

export const RowValue = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-family: "Outfit", sans-serif;
  font-size: 0.75rem;
  line-height: 1rem;

  white-space: nowrap;
`;

export const Count = styled.span`
  color: #3d251e;
  font-weight: 600;
`;

export const Amount = styled.span`
  color: #9b6e62;
  font-weight: 400;
`;

export const Dot = styled.span`
  width: 0.625rem;
  height: 0.625rem;
  flex-shrink: 0;

  border-radius: 0.25rem;

  background-color: ${({ theme, $color }) => theme.colors[$color]};
`;

export const SegmentBar = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 5.412vh;

  display: flex;
  align-items: flex-start;

  margin-bottom: 2.353vh;
  padding: 1.765vh 1.441vw 2.353vh;

  overflow: hidden;

  background-color: #fffcf8;

  border-right: 0.069vw solid rgba(61, 37, 30, 0.07);
  border-bottom: 0.069vw solid rgba(61, 37, 30, 0.07);
  border-left: 0.069vw solid rgba(61, 37, 30, 0.07);

  border-radius: 0 0 1.372vw 1.372vw;

  background-image: linear-gradient(#ede8e2, #ede8e2);
  background-repeat: no-repeat;
  background-position: center 1.765vh;
  background-size: calc(100% - 2.882vw) 1.176vh;
`;

export const Segment = styled.div`
  height: 1.176vh;
  flex-shrink: 0;

  background-color: ${({ theme, $color }) => theme.colors[$color]};

  &:first-child {
    border-radius: 0.686vw 0 0 0.686vw;
  }

  &:last-child {
    border-radius: 0 0.686vw 0.686vw 0;
  }

  &:only-child {
    border-radius: 0.686vw;
  }
`;

export const Notice = styled.div`
  box-sizing: border-box;
  width: 100%;

  height: ${({ $completed }) => ($completed ? "9.265vh" : "12.132vh")};

  display: flex;
  align-items: flex-start;
  gap: 0.858vw;

  padding: 1.765vh 1.372vw;
  margin: 0;

  color: ${({ $completed }) => ($completed ? "#2e6b47" : "#5c3327")};

  background-color: ${({ $completed }) => ($completed ? "#e8f2ec" : "#f2ebe4")};

  border-radius: 1.029vw;

  font-size: 0.75rem;
  line-height: 1.21875rem;

  strong {
    font-weight: 700;
  }
`;

export const Icon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export const SavingText = styled.p`
  box-sizing: border-box;
  width: 100%;
  height: 3.527vh;

  margin: 0;
  padding-top: 1.176vh;

  color: #9b6e62;

  text-align: center;

  font-family: "Outfit", sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;

  strong {
    color: #5c3327;
    font-weight: 600;
  }
`;

export const UnselectedBox = styled.div`
  box-sizing: border-box;
  width: 100%;

  display: flex;
  flex-direction: column;

  padding: 10px 12px;

  background-color: ${({ $completed }) => ($completed ? "#F0F7F2" : "#FFF0E6")};

  border-radius: 12px;
`;

export const UnselectedTop = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UnselectedDot = styled.span`
  width: 0.625rem;
  height: 0.625rem;
  flex-shrink: 0;

  background-color: ${({ $completed }) => ($completed ? "#2E7D52" : "#E98252")};

  border-radius: 0.25rem;
`;

export const UnselectedTitle = styled.span`
  color: ${({ $completed }) => ($completed ? "#2E7D52" : "#C05328")};

  font-family: "Outfit", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
`;

export const UnselectedCount = styled.span`
  color: ${({ $completed }) => ($completed ? "#2E7D52" : "#C05328")};

  font-family: "Outfit", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
`;

export const UnselectedAmount = styled.span`
  color: #9b6e62;

  font-family: "Outfit", sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
`;

export const UnselectedDescription = styled.p`
  margin: 4px 0 0;

  color: ${({ $completed }) => ($completed ? "#6A9B7E" : "#D88662")};

  font-family: "Outfit", sans-serif;
  font-size: 0.6875rem;
  font-weight: 400;
  line-height: 1rem;
`;

export const ProgressInfo = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  padding: 10px 1.441vw 0;

  color: #9b6e62;

  font-family: "Outfit", sans-serif;
  font-size: 0.6875rem;
  line-height: 1rem;

  background-color: #fffcf8;

  border-right: 0.069vw solid rgba(61, 37, 30, 0.07);
  border-left: 0.069vw solid rgba(61, 37, 30, 0.07);
`;
