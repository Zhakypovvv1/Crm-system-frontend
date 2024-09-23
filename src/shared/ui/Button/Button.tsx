import React from "react";
import s from "./Button.module.scss";
import classNames from "classnames";

type typeButton = "button" | "reset" | "submit";

interface MyComponentProps {
  variant?: string;
  type?: typeButton;
  size?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
}

const AppButton: React.FC<MyComponentProps> = ({
  variant = "primary",
  type = "button",
  size = "small",
  children,
  isLoading = false,
  onClick,
  ...props
}) => {
  const buttonClass = classNames(s.button, s[variant], s[size]);

  return (
    <button
      onClick={onClick}
      type={type}
      className={buttonClass}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default AppButton;
