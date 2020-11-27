export const invitePlayers = (gameId) => {
  if (navigator.share) {
    navigator.share({
      title: 'Come play NewsGamer with me.',
      text: 'Come play NewsGamer with me.',
      url: 'https://newsgamer.herokuapp.com/game/' + gameId,
    });
  }
};
