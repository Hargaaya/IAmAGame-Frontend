import type { Game, Player } from "../types/global";

const GetWinningPlayer = (players: Player[], currentGame?: Game) => {
  return players.filter(p => {
    if (!currentGame || !currentGame.submissions) {
      const highestRatedPlayer = players.filter(p => p.score === players.map(p => p.score).reduce((a, b) => Math.max(a, b)))[0];
      return highestRatedPlayer.id === p.id;
    }

    const highestRatedSubmission = currentGame.submissions
      .filter(s => s.votes === currentGame?.submissions?.map(s => s.votes).reduce((a, b) => Math.max(a, b)))[0];

    const player = players.filter(p => p.id === highestRatedSubmission.playerId)[0];
    return player.id === p.id;
  })[0];
}

export default GetWinningPlayer;