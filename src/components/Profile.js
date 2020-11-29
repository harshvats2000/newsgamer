import React, { useEffect, useState } from 'react';
import Header from './Header';
import firebase from '../firebase';
import classes from '../styles/profile.module.css';

const db = firebase.firestore();

const Profile = ({ user, setIsAuthenticated }) => {
  const [playedGames, setPlayedGames] = useState([]);

  useEffect(() => {
    let games = [];
    db.collection('games')
      .orderBy('creationdate', 'desc')
      .where('players', 'array-contains', user.displayName)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          doc.data().over && games.push(doc.data());
        });
        setPlayedGames(games);
      });
  }, []);

  const logout = (e) => {
    if (window.confirm('Are you sure you want to logout of NewsGamer?')) {
      firebase
        .auth()
        .signOut()
        .then(() => setIsAuthenticated(false));
    }
  };

  const gameCard = (game, i) => {
    const initial_array = game.players.map((player) => ({
      name: player,
      score: game[player].length,
    }));

    const sorted_array = initial_array.sort((a, b) => b.score - a.score);
    return (
      <div
        key={i}
        className={classes.card}
        style={{ boxShadow: game.winner === user.displayName ? 'inset 0 0 10px green' : 'inset 0 0 10px red' }}
      >
        <div style={{ whiteSpace: 'break-spaces', textAlign: 'right', color: 'grey' }}>
          {game.overtime + '  |  ' + game.overdate}
        </div>
        <hr />
        <div style={{ textAlign: 'left' }}>
          {sorted_array.map((player, i) => (
            <p
              key={i}
              style={{
                color: player.name === user.displayName ? 'green' : 'red',
              }}
            >
              {`${i + 1}. ${player.name}`} <span style={{ color: 'black' }}>({player.score})</span>
            </p>
          ))}
        </div>
      </div>
    );
  };
  const winPercent = (playedGames.filter((game) => game.winner === user.displayName).length / playedGames.length) * 100;

  return (
    <>
      <Header />

      <div className={classes.body}>
        <div style={{ textAlign: 'center' }}>
          <img src={user.photoURL} alt='' />
          <p>{user.displayName}</p>
          <p>{user.email}</p>
          <button className='btn btn-red' onClick={logout}>
            <i className='fa fa-sign-out btn-icon' />
            Logout
          </button>
        </div>

        <h3 style={{ textAlign: 'center' }}>Winning % = {!isNaN(winPercent) && winPercent.toFixed(2)}</h3>
        <div>{playedGames.map((game, i) => gameCard(game, i))}</div>
      </div>
    </>
  );
};

export default Profile;
