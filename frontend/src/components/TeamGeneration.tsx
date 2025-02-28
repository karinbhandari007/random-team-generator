"use client";
import React from "react";
import TeamList from "./TeamList";
import { GeneratedTeam } from "@/types";

type TeamGenerationProps = {
  generatedTeams: GeneratedTeam[];
};

const TeamGeneration: React.FC<TeamGenerationProps> = ({ generatedTeams }) => {
  return (
    <div className="flex flex-row flex-wrap justify-center">
      {generatedTeams.map((team, index) => (
        <TeamList
          key={index}
          teamNo={index + 1}
          players={team.players}
          className="mr-6"
        />
      ))}
    </div>
  );
};

export default TeamGeneration;
