import { FunctionComponent, ReactElement } from "react";

const skillLevels: number[] = [1, 2, 3, 4, 5];

interface InputProps {
  wrapperClassName?: string;
  skillLevel?: number;
  showSkillLevel?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSkillChange?: (skill: number) => void;
  onDelete?: () => void;
}

const Input: FunctionComponent<InputProps> = ({
  wrapperClassName = "",
  skillLevel = 0,
  showSkillLevel = false,
  value = "",
  onChange,
  onSkillChange,
  onDelete,
}): ReactElement => (
  <div className={`${"flex flex-row"} ${wrapperClassName}`}>
    <div className="flex flex-row mr-4">
      <button
        onClick={onDelete}
        className="flex flex-row py-2 px-3 bg-[#EDEDED] border-[#EDEDED] text-white font-bold text-[#BDBDBD]"
      >
        <span className="pt-1 text-xs">&#x2715;</span>
      </button>
      <input
        type="text"
        className="flex-6 border px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={onChange}
      />
    </div>
    {!!showSkillLevel && (
      <div className="flex flex-row">
        {skillLevels.map((sK: number, key: number) => (
          <span
            key={key}
            className={`${"flex-4 flex flex-row border align-center justify-center py-2 px-4 cursor-pointer hover:bg-[#F55A40] hover:text-white"} ${
              skillLevel > 0 && sK <= skillLevel
                ? "bg-[#F55A40] text-white"
                : ""
            }`}
            onClick={() => onSkillChange?.(sK)}
          >
            {sK}
          </span>
        ))}
      </div>
    )}
  </div>
);

export default Input;
