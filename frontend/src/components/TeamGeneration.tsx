"use client";
import React from "react";
import TeamList from "./TeamList";
import { GeneratedTeam } from "@/types";

type TeamGenerationProps = {
  generatedTeams: GeneratedTeam[];
};

const TeamGeneration: React.FC<TeamGenerationProps> = ({ generatedTeams }) => {
  if (!generatedTeams?.length) return <></>;

  return (
    <div className="flex flex-row flex-wrap justify-center bg-[#EBEBEB] pt-6 pb-10">
      {generatedTeams?.map((team, index) => (
        <TeamList
          key={index}
          teamName={team?.name}
          players={team.players}
          className="mr-8"
        />
      ))}
    </div>
  );
};

export default TeamGeneration;
