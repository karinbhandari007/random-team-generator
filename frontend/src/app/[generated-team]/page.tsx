"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AxiosResponse } from "axios";
import { _getSessionsDetails } from "@/api/api";
import TeamGeneration from "@/components/TeamGeneration";
import { GeneratedTeam as IGeneratedTeam } from "@/types";
import { ISessionResponse } from "@/api/types";
import { useParams } from "next/navigation";

const GeneratedTeam: React.FC = () => {
  const query = useParams();
  const [generatedTeams, setGeneratedTeams] = useState<IGeneratedTeam[]>([]);
  const [generationName, setGenerationName] = useState<string>("");

  const url = useMemo(() => window?.location?.href, []);

  const { teamLen, playersLen } = useMemo(
    () => ({
      teamLen: generatedTeams.length,
      playersLen: generatedTeams?.reduce(
        (count, team) => count + team.players.length,
        0
      ),
    }),
    [generatedTeams]
  );

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(url);
  };

  const getSessionDetails = useCallback(async () => {
    if (!query?.["generated-team"]) return;
    try {
      const resp: AxiosResponse<ISessionResponse> = await _getSessionsDetails(
        query?.["generated-team"] as string
      );
      setGeneratedTeams(resp?.data?.teams);
      setGenerationName(resp?.data?.generationName);
    } catch (err: unknown) {
      console.log("Error: [getSessionDetails]", err);
    }
  }, [query]);

  useEffect(() => {
    getSessionDetails();
  }, [getSessionDetails]);

  return (
    <div className="p-6">
      <div className="py-2 px-4 bg-[#32373C] mb-4">
        <p className="text-l text-white font-bold">{generationName}</p>
        <p className="text-xs text-gray-300">
          {playersLen} participants in {teamLen} teams{" "}
        </p>
      </div>

      <div className="pl-10 mb-6">
        <p className="">
          <span className="text-xs font-bold text-[#8F8F8F]">Share Link</span>{" "}
          <span className="text-xs text-[#878787]">(public draw)</span>
        </p>
        <div>
          <input
            className="min-w-[500px] border py-2 px-3 outline-none"
            value={url}
          />
          <button className="border py-2 px-2" onClick={copyToClipboard}>
            &#x1F4CB;
          </button>
        </div>
      </div>

      <TeamGeneration generatedTeams={generatedTeams} />
    </div>
  );
};

export default GeneratedTeam;
