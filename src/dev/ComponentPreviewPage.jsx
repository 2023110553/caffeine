// src/dev/ComponentPreviewPage.jsx
// ⚠️ 커밋 전 삭제 예정 — 공통 컴포넌트 육안 확인용 임시 페이지
import { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Chip from "../components/Chip";
import Badge from "../components/Badge";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Loading from "../components/Loading";

function ComponentPreviewPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Wrapper>
      <Section>
        <h3>Button</h3>
        <Row>
          <Button variant="unchecked_button">☕ 사업 지출</Button>
          <Button variant="unchecked_button">👤 개인 지출</Button>
          <Button variant="checked_button_brown">✓ 사업 지출</Button>
          <Button variant="checked_button_beige">✓ 개인 지출</Button>
          <Button variant="button_large_brown" size="large">
            분류 완료 및 부가세 예측하기
          </Button>
          <Button variant="button_large_green" size="large">
            ✓ 저장 완료!
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </Row>
      </Section>

      <Section>
        <h3>Chip</h3>
        <Row>
          <Chip variant="unchecked">전체</Chip>
          <Chip variant="checked">전체</Chip>
        </Row>
      </Section>

      <Section>
        <h3>Badge</h3>
        <Row>
          <Badge variant="unclassified">미분류</Badge>
          <Badge variant="classified">분류 완료</Badge>
        </Row>
      </Section>

      <Section>
        <h3>Input</h3>
        <Row>
          <Input label="사업자번호" placeholder="000-00-00000" />
          <Input label="이메일" error="올바른 이메일이 아니에요" />
        </Row>
      </Section>

      <Section>
        <h3>Loading</h3>
        <Loading />
      </Section>

      <Section>
        <h3>Modal</h3>
        <Button onClick={() => setModalOpen(true)}>모달 열기</Button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="테스트 모달">
          <p>모달 내용이 여기 들어가요.</p>
          <Button onClick={() => setModalOpen(false)}>닫기</Button>
        </Modal>
      </Section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

export default ComponentPreviewPage;
