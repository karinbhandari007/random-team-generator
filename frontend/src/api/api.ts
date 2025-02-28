import axios from "axios";
import { IGenerateTeamsReq } from "./types";

// TODO: import URL  from env
export const _generateTeams = async (generateTeams: IGenerateTeamsReq) =>
  await axios.post("http://localhost:3001/sessions", generateTeams);

export const _getSessionsDetails = async (sessionId: string) =>
  await axios.get(`http://localhost:3001/sessions/${sessionId}`);
