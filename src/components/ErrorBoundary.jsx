import { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// React가 렌더링 중 에러를 잡는 방법은 현재 클래스 컴포넌트의 componentDidCatch뿐이라 훅으로 대체할 수 없다.
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("렌더링 중 예외 발생:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Wrapper>
          <Message>예상치 못한 문제가 발생했어요.</Message>
          <RetryButton type="button" onClick={this.handleReload}>
            새로고침
          </RetryButton>
        </Wrapper>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.txt_brown};
  font-size: 16px;
  font-weight: 600;
`;

const RetryButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.medium};
  background-color: ${({ theme }) => theme.colors.bg_brown};
  color: ${({ theme }) => theme.colors.txt_white};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

export default ErrorBoundary;
