import type { Player } from "../types/global";

const sortPlayersByPoints = (players: Player[]) => {
  return players.sort((a, b) => {
    if(a.score > b.score) return -1;
    if(a.score < b.score) return 1;
    return 0;
  })
}

export default sortPlayersByPoints;