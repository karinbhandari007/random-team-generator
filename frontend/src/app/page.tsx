"use client";

import React, { useState } from "react";
import PlayerForm from "../components/PlayerForm";
import TeamForm from "../components/TeamForm";
import Button from "@/components/common/Button";
import { Player, Team } from "@/types";
import { _generateTeams } from "@/api/api";
import { AxiosResponse } from "axios";
import { ISessionResponse } from "@/api/types";

const Home: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [generatedTeams, setGeneratedTeams] = useState<GeneratedTeam[]>([]);

  const generateTeams = async () => {
    try {
      if (!players?.length || !teams?.length) {
        confirm("Players or Teams cannot be empty!");
        return;
      }
      setLoading(true);
      const resp: AxiosResponse<Omit<ISessionResponse, "players">> =
        await _generateTeams({
          teams,
          players,
        });

      if (resp?.data) {
        window.open(
          window.location.origin + "/" + resp?.data?.sessionId,
          "_blank"
        );
      }

      // setGeneratedTeams(resp?.data?.teams);
    } catch (err: unknown) {
      console.log("Error: [getSessionDetails]", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Random Team Generator</h1>

      <div>
        <PlayerForm
          className="flex-1 bg-[#EDEDED] p-8 pt-4"
          players={players}
          setPlayers={setPlayers}
        />
        <TeamForm
          className="flex-1 mt-10 bg-[#EDEDED] p-8 pt-4"
          teams={teams}
          setTeams={setTeams}
        />
      </div>

      <div className="pt-6 flex flex-row justify-center">
        <Button
          disabled={loading}
          text={loading ? "Generating..." : "Generate Teams"}
          onClick={generateTeams}
        />
      </div>

      {/* <TeamGeneration generatedTeams={generatedTeams} /> */}
    </div>
  );
};

export default Home;
