import s from "./errorAlert.module.scss";

interface MessageProps {
  message: string;
}

const ErrorAlert: React.FC<MessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className={s.errorAlert}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorAlert;
