import { FunctionComponent, ReactElement } from "react";

interface InputProps {
  wrapperClassName?: string;
  skillLevel?: number;
  showSkillLevel?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSkillChange?: (skill: number) => void;
  onDelete?: () => void;
  skillLevels?: number[];
}

const Input: FunctionComponent<InputProps> = ({
  wrapperClassName = "",
  skillLevel = 0,
  showSkillLevel = false,
  value = "",
  onChange,
  onSkillChange,
  onDelete,
  skillLevels = [1, 2, 3, 4, 5],
}): ReactElement => (
  <div className={`${"flex flex-row"} ${wrapperClassName}`}>
    <div className="flex flex-row mr-4">
      <button
        onClick={onDelete}
        className="flex flex-row py-2 px-3 bg-[#EDEDED] border border-gray-300 text-white font-bold text-[#BDBDBD]"
      >
        <span className="pt-1 text-xs text-[#BCBCBC]">&#x2715;</span>
      </button>
      <input
        type="text"
        className="flex-6 border border-gray-300 px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={onChange}
      />
    </div>
    {!!showSkillLevel && (
      <div className="flex flex-row bg-white">
        {skillLevels.map((sK: number, key: number) => (
          <span
            key={key}
            className={`${"flex-4 flex flex-row align-center justify-center py-2 px-4 cursor-pointer hover:bg-[#F55A40] hover:text-white"} ${
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
