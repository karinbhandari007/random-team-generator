import React from "react";
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
  return (
    <div className={`mt-10 ${className}`}>
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
          />
        ))
      ) : (
        <p className="text-gray-500 mt-4">No players assigned to this team.</p>
      )}
    </div>
  );
};

export default TeamList;
