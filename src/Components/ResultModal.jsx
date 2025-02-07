import { useImperativeHandle, useRef, forwardRef } from "react";

// eslint-disable-next-line react/prop-types
const ResultModal = forwardRef(function ResultModal({onClose}, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
    close() {
      dialog.current.close();
    },
  }));

  return (
    <dialog ref={dialog} className="result-modal">
      <p>註冊完成！</p>
      <button onClick={onClose}>確定</button>
    </dialog>
  );
});

export default ResultModal;
