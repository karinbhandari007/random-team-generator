import { FunctionComponent, ReactElement } from "react";

interface AddButtonProps {
  count: number;
  text: string;
  wrapperClassName?: string;
  onClick?: () => void;
}

const AddButton: FunctionComponent<AddButtonProps> = ({
  count,
  text,
  wrapperClassName,
  onClick,
}): ReactElement => (
  <div className={`${"flex flex-row"} ${wrapperClassName}`}>
    <div className="flex flex-row py-2 px-3 bg-[#BDBDBD] border-[#BDBDBD] text-white font-bold">
      <span>{count}</span>
    </div>
    <button className="px-4 py-2 bg-[#878787] text-white" onClick={onClick}>
      {text}
    </button>
  </div>
);

export default AddButton;
