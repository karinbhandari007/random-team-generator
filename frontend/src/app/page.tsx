"use client";

import React, { useState } from "react";
import PlayerForm from "../components/PlayerForm";
import TeamForm from "../components/TeamForm";
import TeamGeneration from "../components/TeamGeneration";
import Button from "@/components/common/Button";
import { GeneratedTeam, Player, Team } from "@/types";

const Home: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [generatedTeams, setGeneratedTeams] = useState<GeneratedTeam[]>([]);

  const generateTeams = () => {
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    const newGeneratedTeams = teams.map((team, index) => ({
      name: team.name,
      players: shuffledPlayers.filter((_, i) => i % teams.length === index),
    }));
    setGeneratedTeams(newGeneratedTeams);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Random Team Generator</h1>

      <div className="flex flex-row">
        <PlayerForm
          className="flex-1 flex flex-col items-center"
          players={players}
          setPlayers={setPlayers}
        />
        <TeamForm
          className="flex-1 flex flex-col items-center"
          teams={teams}
          setTeams={setTeams}
        />
      </div>

      <div className="pt-6 flex flex-row justify-center">
        <Button text="Generate Teams" onClick={generateTeams} />
      </div>

      <TeamGeneration generatedTeams={generatedTeams} />
    </div>
  );
};

export default Home;
