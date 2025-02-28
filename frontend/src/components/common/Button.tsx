import { FunctionComponent } from "react";

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({
  text,
  className = "",
  disabled = false,
  onClick = () => {},
}) => (
  <button
    className={`px-4 py-2 bg-[#878787] text-white ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default Button;
