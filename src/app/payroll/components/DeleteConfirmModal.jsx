import { useState } from "react";
import styled from "styled-components";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";

// 피그마 디자인(node-id=100-7966)에서는 "삭제" 문구로 되어 있지만, 실제 동작은 완전 삭제가 아니라
// 퇴사 처리(soft delete, status만 INACTIVE로 변경)라서 문구는 실제 동작에 맞춰 "퇴사 처리"로 사용한다.
// 레이아웃도 피그마의 행 옆 앵커 팝오버 대신, CancelSubscriptionModal과 동일하게 공용 Modal(화면 중앙 오버레이)을 재사용했다.
// 다만 내용이 짧은 확인창이라 Modal 기본 크기(640x612)는 과했음 - width/height props로 작게 지정.
function DeleteConfirmModal({ open, onClose, onConfirm, employeeName }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={`${employeeName} 직원을 퇴사 처리하시겠습니까?`}
      width="420px"
      height="auto"
    >
      <Description>퇴사 처리하면 이번 달 인건비 계산 및 세무 리포트에서 제외됩니다.</Description>

      <ButtonRow>
        <Button
          type="button"
          variant="unchecked_button"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          취소
        </Button>
        <Button
          type="button"
          variant="button_large_gray"
          onClick={handleConfirm}
          disabled={isSubmitting}
        >
          {isSubmitting ? "처리 중..." : "퇴사 처리하기"}
        </Button>
      </ButtonRow>
    </Modal>
  );
}

const Description = styled.p`
  color: rgba(
    61,
    37,
    30,
    0.6
  ); /* TODO: theme.js에 없는 값 - CancelSubscriptionModal Description과 동일 톤 */
  font-size: 13px; /* TODO: design token화 */
  line-height: 1.5;
  margin-top: 8px; /* TODO: design token화 */
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px; /* TODO: design token화 */
  margin-top: 24px; /* TODO: design token화 */

  > button {
    width: auto;
    padding: 10px 18px; /* TODO: design token화 */
  }
`;

export default DeleteConfirmModal;
