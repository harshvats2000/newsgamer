import React, { useEffect, useState } from 'react';
import Header from './Header';
import firebase from '../firebase';
import classes from '../styles/profile.module.css';

const db = firebase.firestore();

const Profile = ({ user }) => {
  const [playedGames, setPlayedGames] = useState([]);

  useEffect(() => {
    let games = [];
    db.collection('games')
      .orderBy('creationdate', 'desc')
      .where('players', 'array-contains', user.displayName)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          games.push(doc.data());
        });
        setPlayedGames(games);
      });
  }, []);

  const gameCard = (game, i) => {
    const initial_array = game.players.map((player) => ({
      name: player,
      score: game[player].length,
    }));

    const sorted_array = initial_array.sort((a, b) => b.score - a.score);
    return (
      <div key={i} className={classes.card}>
        <div style={{ textAlign: 'left' }}>
          {sorted_array.map((player, i) => (
            <div
              key={i}
              style={{
                marginBottom: '5px',
                color: player.name === user.displayName ? 'green' : 'red',
              }}
            >
              {`${i + 1}. ${player.name}`}{' '}
              <span style={{ color: 'black' }}>({player.score})</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  console.log(playedGames.filter((game) => game.winner === user.displayName).length);
  const winPercent =
    (playedGames.filter((game) => game.winner === user.displayName).length /
      playedGames.length) *
    100;
  return (
    <>
      <Header />

      <div className={classes.body}>
        <h3 style={{ textAlign: 'center' }}>
          Winning % = {!isNaN(winPercent) && winPercent.toFixed(2)}
        </h3>
        <div>{playedGames.map((game, i) => gameCard(game, i))}</div>
      </div>
    </>
  );
};

export default Profile;