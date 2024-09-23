import ReactDOM from "react-dom";
import s from "./Modal.module.scss";
import classNames from "classnames";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = "medium",
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={s.overlay} onClick={onClose}>
      <div
        className={classNames(s.modal, s[size])}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={s.closeButton} onClick={onClose}>
          x
        </button>
        <div className={s.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
