import React from 'react';
import { Link } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import classes from '../styles/header.module.css';

const Header = () => {
  const drop = useSpring({
    config: { mass: 2, tension: 500 },
    from: { transform: 'translateY(-100px)' },
    to: { transform: 'translateY(0)' },
  });
  return (
    <div>
      <div className={classes.header}>
        <div className={classes.newsgamer}>
          <Link to='/'>
            <span style={{ color: 'white', background: 'black', padding: '0 4px' }}>News</span>
            Gamer
          </Link>
        </div>
        <animated.div style={drop}>
          <Link to='/how-to-play'>
            <i
              className='fa fa-question-circle'
              style={{ paddingRight: '8px', fontSize: '2.4rem' }}
            />
          </Link>
        </animated.div>
      </div>
    </div>
  );
};

export default Header;
