import axios from "axios";
import { IGenerateTeamsReq } from "./types";

export const _generateTeams = async (generateTeams: IGenerateTeamsReq) =>
  await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "/sessions",
    generateTeams
  );

export const _getSessionsDetails = async (sessionId: string) =>
  await axios.get(process.env.NEXT_PUBLIC_BASE_URL + `/sessions/${sessionId}`);
