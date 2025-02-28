"use client";
import React from "react";
import Input from "./common/Input";
import AddButton from "./common/AddButton";
import { Team } from "@/types";

type TeamFormProps = {
  className?: string;
  teams: Team[];
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
};

const TeamForm: React.FC<TeamFormProps> = ({
  className = "",
  teams,
  setTeams,
}) => {
  const addTeam = () => {
    setTeams([...teams, { name: "" }]);
  };

  const removeTeam = (index: number) => {
    setTeams(teams.filter((_, i) => i !== index));
  };

  const updateTeam = (index: number, name: string) => {
    const newTeams = [...teams];
    newTeams[index] = { name };
    setTeams(newTeams);
  };

  return (
    <div className={className}>
      <h2 className="text-l font-bold">Teams</h2>
      {teams.map((team, index) => (
        <Input
          key={index}
          wrapperClassName="mt-4"
          value={team.name}
          onChange={(e) => updateTeam(index, e.target.value)}
          onDelete={() => {
            return confirm("Are you sure, you want to delete this team!")
              ? removeTeam(index)
              : () => {};
          }}
        />
      ))}
      <AddButton
        count={teams.length}
        text="Add Team"
        wrapperClassName="mt-4"
        onClick={addTeam}
      />
    </div>
  );
};

export default TeamForm;
