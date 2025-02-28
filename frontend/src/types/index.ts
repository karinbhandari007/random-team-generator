export type Player = {
  name: string;
  skillLevel: number;
};

export type Team = {
  name: string;
};

export type GeneratedTeam = {
  name: string;
  players: Player[];
};
