import React, { useMemo } from "react";
import Input from "./common/Input";

type Player = {
  name: string;
  skillLevel: number;
};

type TeamListProps = {
  teamNo: number;
  players: Player[];
  className?: string;
};

const TeamList: React.FC<TeamListProps> = ({
  teamNo,
  players,
  className = "",
}) => {
  const totalSkillLevel = useMemo(
    () => players.reduce((sum, player) => sum + player.skillLevel, 0),
    [players]
  );

  return (
    <div className={`${className}`}>
      <h2 className="text-l font-bold">
        Team {teamNo} <span className="text-gray-400">({players?.length})</span>
      </h2>
      {players.length > 0 ? (
        players.map((player, index) => (
          <Input
            key={index}
            wrapperClassName="mt-4"
            skillLevel={player.skillLevel}
            showSkillLevel={true}
            value={player.name}
            skillLevels={[player.skillLevel]}
          />
        ))
      ) : (
        <p className="text-gray-500 mt-4">No players assigned to this team.</p>
      )}
      <div className="flex flex-row justify-end pr-4 pt-2 text-[#9B9B9B]">
        {totalSkillLevel}
      </div>
    </div>
  );
};

export default TeamList;
