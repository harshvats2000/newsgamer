import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase';
import { Link, withRouter } from 'react-router-dom';
import Header from './Header';
import { getRandomAlphabet } from '../functions/getRandomAlphabet';
import { content, max_score } from '../constants';
import classes from '../styles/home.module.css';
import Loader from './Loader';
import { animated, useTransition } from 'react-spring';

const db = firebase.firestore();

const Home = ({ history, user, setIsAuthenticated }) => {
  const [availGames, setAvailGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const paraIndex = Math.floor(Math.random() * content.length);

  useEffect(() => {
    setLoading(true);
    fetchGames();

    // Set interval to update games in every 5s
    // setInterval(fetchGames, 5000);
  }, []);

  const fetchGames = () => {
    let games = [];
    let refresh_icon = document.getElementById('refresh-icon');
    if (refresh_icon) {
      refresh_icon.classList.add('fa-spin');

      db.collection('games')
        .orderBy('creationdate', 'asc')
        .where('over', '==', false)
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            games.push(doc.data());
          });
          setAvailGames(games);
          setLoading(false);
          document.getElementById('refresh-icon').classList.remove('fa-spin');
        });
    }
  };

  const generateLetter = () => {
    let letter = getRandomAlphabet();

    // Check if paragraph contains enough words with alphabet
    let arr = content[paraIndex]
      .split(' ')
      .filter((word) => word.toLowerCase().indexOf(letter) === 0);

    if (arr.length >= max_score && arr.length <= max_score + 5) {
      console.log(paraIndex, ' at 57');
      return letter;
    } else {
      return generateLetter();
    }
  };

  const createGame = (e) => {
    let letter = generateLetter();

    const id = uuidv4();
    db.collection('games')
      .doc(id)
      .set({
        players: [user.displayName],
        createdby: user.displayName,
        gameid: id,
        letter: letter,
        paraindex: paraIndex,
        [user.displayName]: [],
        creationdate: firebase.database.ServerValue.TIMESTAMP,
        over: false,
        start: false,
      })
      .then(() => {
        console.log(paraIndex, ' at 82');
        history.push(`/game/${id}`);
      });
  };

  const deleteGame = (gameid) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      db.collection('games')
        .doc(gameid)
        .get()
        .then((doc) => {
          if (doc.data()) {
            doc.ref.delete().then(() => fetchGames());
          }
        });
    }
  };

  const logout = (e) => {
    if (window.confirm('Are you sure you want to logout of NewsGamer?')) {
      firebase
        .auth()
        .signOut()
        .then(() => setIsAuthenticated(false));
    }
  };

  const nameAndActions = () => {
    return (
      <div style={{ padding: '10px', textAlign: 'center' }}>
        <h2>
          Hello,{' '}
          <span style={{ color: 'green', textTransform: 'capitalize' }}>
            {user && user.displayName}
          </span>
        </h2>
        <button onClick={(e) => createGame(e)} style={{ marginRight: '10px' }}>
          <i className='fa fa-plus btn-icon' />
          create new game
        </button>
        <button style={{ background: 'red' }} onClick={logout}>
          <i className='fa fa-sign-out btn-icon' />
          Logout
        </button>
      </div>
    );
  };

  const refreshLine = () => {
    return (
      <div className={classes.refresh}>
        <div style={{ fontSize: '0.8rem' }}>
          The games are updated every{' '}
          <span style={{ fontWeight: 900, verticalAlign: 'middle' }}>5</span> seconds.
        </div>
        <i className='fa fa-refresh' id='refresh-icon' onClick={(e) => fetchGames()} />
      </div>
    );
  };

  const availGameList = (game, i) => {
    return (
      <div key={i} className={classes.card}>
        <Link to={`/game/${game.gameid}`} style={{ flex: 1 }}>
          <div>
            Game by <span style={{ fontWeight: '600' }}>{game.createdby}</span>.
          </div>
        </Link>
        {game.createdby === user.displayName ? (
          <div style={{ marginRight: '10px' }}>
            <i
              className='fa fa-trash'
              style={{ color: 'red' }}
              onClick={(e) => deleteGame(game.gameid)}
            />
          </div>
        ) : null}
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
    <div key={key}>
      <Header />
      <animated.div key={key} style={props}>
        <div style={{ marginTop: '65px' }}>
          {nameAndActions()}

          {refreshLine()}

          {loading ? (
            <Loader />
          ) : (
            <div
              style={{
                marginTop: '5px',
                padding: '20px 10px 10px',
                fontSize: '1.2rem',
              }}
            >
              {availGames.length === 0 ? (
                <p className='para' style={{ boxShadow: '0 0 10px gainsboro' }}>
                  No games are being played right now.
                </p>
              ) : null}
              {availGames.map((game, i) => availGameList(game, i))}
            </div>
          )}
        </div>
      </animated.div>
    </div>
  ));
};

export default withRouter(Home);
