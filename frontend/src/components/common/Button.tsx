import { FunctionComponent } from "react";

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

const Button: FunctionComponent<ButtonProps> = ({
  text,
  className = "",
  onClick = () => {},
}) => (
  <button
    className={`px-4 py-2 bg-[#878787] text-white ${className}`}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
