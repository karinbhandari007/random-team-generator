"use client";
import React from "react";
import Input from "./common/Input";
import AddButton from "./common/AddButton";
import { Player } from "@/types";

type PlayerFormProps = {
  className?: string;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
};

const PlayerForm: React.FC<PlayerFormProps> = ({
  className = "",
  players,
  setPlayers,
}) => {
  const addPlayer = () => {
    setPlayers([...players, { name: "", skillLevel: 1 }]);
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const updatePlayer = (index: number, name: string, skillLevel: number) => {
    const newPlayers = [...players];
    newPlayers[index] = { name, skillLevel };
    setPlayers(newPlayers);
  };

  return (
    <div className={className}>
      <h2 className="text-l font-bold">Players</h2>
      {players.map((player, index) => (
        <Input
          key={index}
          wrapperClassName="mt-4"
          showSkillLevel
          skillLevel={player.skillLevel}
          value={player.name}
          onChange={(e) =>
            updatePlayer(index, e.target.value, player.skillLevel)
          }
          onSkillChange={(skill) => updatePlayer(index, player.name, skill)}
          onDelete={() => removePlayer(index)}
        />
      ))}
      <AddButton
        count={players.length}
        text="Add Player"
        wrapperClassName="mt-4"
        onClick={addPlayer}
      />
    </div>
  );
};

export default PlayerForm;
