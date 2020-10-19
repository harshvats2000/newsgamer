import { firestore } from 'firebase';
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { content, max_score } from '../constants';
import firebase from '../firebase';
import Timer from 'react-compound-timer';
import classes from '../styles/gamepage.module.css';
import Loader from './Loader';
import { animated, useTransition } from 'react-spring';
import { invitePlayers } from '../functions/invitePlayers';

const db = firebase.firestore();

const GamePage = ({ user, location }) => {
  const gameId = location.pathname.split('/')[2];
  const games_doc = db.collection('games').doc(gameId);
  const [currGame, setCurrGame] = useState({});
  const [fetching, setFeching] = useState(true);

  useEffect(() => {
    // Listen for live changes in the current game
    games_doc.onSnapshot((doc) => {
      if (doc.data()) {
        setCurrGame(doc.data());
      } else {
        setCurrGame({});
      }
      if (fetching) setFeching(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currGame[user.displayName]) {
      // Highlight initial words of array
      currGame[user.displayName].map((id) => {
        let el = document.getElementById(id);
        if (el) el.style.backgroundColor = 'yellow';
      });
    }
  });

  useEffect(() => {
    // Making sure game exists
    if (currGame.createdby) {
      // If any new player comes, add him to game
      if (currGame.players.indexOf(user.displayName) === -1) {
        games_doc.get().then((doc) => {
          if (doc.data()) {
            doc.ref.update({
              players: firestore.FieldValue.arrayUnion(user.displayName),
              [user.displayName]: [],
            });
          }
        });
      }

      // Update winner on score greater than max_score
      currGame.players.map((player) => {
        if (currGame[player].length >= max_score)
          games_doc.update({ over: true, winner: player });
      });
    }
  }, [currGame]);

  const handleClick = (id) => {
    let words = currGame[user.displayName];
    // If the word is eligible
    if (id.toLowerCase().search(currGame.letter) === 0) {
      // If it's a new word
      if (words.indexOf(id) === -1) {
        // document.getElementById(`${word}${i}`).style.background = 'yellow'; // Highlight the word
        words.push(id);
        games_doc.update({ [user.displayName]: words }); // Update words in database
      } else {
        document.getElementById(id).style.background = 'gainsboro'; // Remove highlighting
        words = words.filter((item) => item !== id);
        games_doc.update({ [user.displayName]: words }); // Update words in database
      }
    }
  };

  const startgame = ({ start }) => {
    games_doc.get().then((doc) => {
      if (doc.data()) {
        doc.ref.update({ start: true }).then(start);
      }
    });
  };

  const headerScreen = () => {
    return (
      <div className={classes.header}>
        <div style={{ fontSize: '.8rem' }}>
          Host:{' '}
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>{currGame.createdby}</span>
        </div>
        <div className={classes.letterAndTimer}>
          <div style={{ fontSize: '.8rem' }}>
            Click words starting with letter:{' '}
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{currGame.letter}</span>
          </div>
          <div className={classes.timer}>
            <Timer.Minutes />: <Timer.Seconds />
          </div>
        </div>
        <div className={classes.players}>{listPlayers()}</div>
      </div>
    );
  };

  const listPlayers = () => {
    return currGame.players.map((player, i) => {
      return (
        <div
          key={i}
          style={{
            color: user.displayName === player ? 'green' : 'red',
          }}
        >
          <div>{player.split(' ')[0]}</div>
          <div style={{ textAlign: 'center', fontSize: '2rem' }}>
            {currGame[player] && currGame[player].length}
          </div>
        </div>
      );
    });
  };

  const hostInitialScreen = ({ start }) => {
    return (
      <>
        <div
          style={{
            textAlign: 'center',
            padding: '20px 0 10px',
          }}
        >
          <button onClick={() => startgame({ start })}>start game</button>
          <div style={{ marginTop: '10px' }}>
            <button className='btn-dark' onClick={() => invitePlayers(gameId)}>
              <i className='fa fa-user-plus btn-icon' aria-hidden='true'></i>
              Invite Players
            </button>
          </div>
        </div>
        <div>
          <p className='para' style={{ textAlign: 'center', boxShadow: '0 0 10px gainsboro' }}>
            Starting the game will reveal the paragraph to everyone in the game.
          </p>
        </div>
      </>
    );
  };

  const otherPlayersInitialScreen = () => {
    return (
      <>
        <h2 style={{ paddingLeft: '10px' }}>
          Game is not yet started by {currGame.createdby}.
        </h2>
      </>
    );
  };

  const newsPaper = () => {
    return (
      <div className='newspaper'>
        {content[currGame.paraindex].split(' ').map((word, i) => {
          let id = word.trim().replace('”', '').replace('“', '').replace(',', '') + i;
          return (
            <span key={i} style={{ whiteSpace: 'initial' }}>
              <span id={id} onClick={(e) => handleClick(id)}>
                {word}
              </span>{' '}
            </span>
          );
        })}
      </div>
    );
  };

  const gameOverScreen = () => {
    const initial_array = currGame.players.map((player) => ({
      name: player,
      score: currGame[player].length,
    }));

    const sorted_array = initial_array.sort((a, b) => b.score - a.score);
    return (
      <>
        <div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
          <div>
            <h1 style={{ textAlign: 'center' }}>Game Over</h1>
            <h3 style={{ textAlign: 'center' }}>
              {currGame.winner === user.displayName ? 'You Won 🏆.' : 'You Lose!'}
            </h3>
            <hr />
            <div>
              {sorted_array.map((player, i) => {
                return (
                  <div
                    style={{
                      color: player.name === user.displayName ? 'green' : 'red',
                      fontWeight: '600',
                      marginBottom: '8px',
                    }}
                  >
                    {i + 1}. {player.name}: {player.score}
                  </div>
                );
              })}
            </div>
            <Link to='/'>
              <button style={{ marginTop: '20px' }}>Go back to home page</button>
            </Link>
          </div>
        </div>
      </>
    );
  };

  const gameDoesNotExistScreen = () => {
    return (
      <div style={{ paddingTop: '50px' }}>
        <p className='para'>This game is either over or deleted by the host.</p>
        <div style={{ textAlign: 'center' }}>
          <Link to='/'>
            <button>
              <i className='fa fa-arrow-left btn-icon' />
              Go Back To Home
            </button>
          </Link>
        </div>
      </div>
    );
  };

  const [show, set] = useState(false);
  const transitions = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transitions.map(({ item, key, props }) => (
    <animated.div style={props} key={key}>
      {fetching ? (
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <Loader />
        </div>
      ) : Object.keys(currGame).length === 0 ? (
        gameDoesNotExistScreen()
      ) : currGame.over ? (
        gameOverScreen()
      ) : (
        <>
          <Timer>
            {({ start }) => (
              <>
                {headerScreen()}

                {!currGame.start ? (
                  <div style={{ marginTop: '130px' }}>
                    {currGame.createdby === user.displayName
                      ? hostInitialScreen({ start })
                      : otherPlayersInitialScreen()}
                  </div>
                ) : (
                  newsPaper()
                )}
              </>
            )}
          </Timer>
        </>
      )}
    </animated.div>
  ));
};

export default withRouter(GamePage);
