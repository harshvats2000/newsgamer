export const invitePlayers = (gameId: string) => {
  if (navigator.share) {
    navigator.share({
      title: 'Come play NewsGamer with me.',
      text: 'Come play NewsGamer with me.',
      url: 'https://newsgamer.vercel.app/game/' + gameId,
    });
  }
};
