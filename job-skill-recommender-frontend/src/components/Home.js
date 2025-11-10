import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <h2 className={styles.heading}>Welcome to Job Skill Recommender</h2>
      <p className={styles.lead}>Enter your skills below to discover matching jobs tailored for you.</p>
    </div>
  );
};

export default Home;
