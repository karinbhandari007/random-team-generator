import { Player, Team } from "@/types";

export interface IGenerateTeamsReq {
  teams: Team[];
  players: Player[];
}

export interface IPlayer {
  id: string;
  name: string;
  skillLevel: number;
  team: {
    id: string;
    name: string;
  };
}

export interface ITeam {
  id: string;
  name: string;
  players: Player[];
}

export interface ISessionResponse {
  sessionId: string;
  teams: ITeam[];
  players: IPlayer[];
}
