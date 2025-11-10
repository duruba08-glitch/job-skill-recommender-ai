import React, { useState } from 'react';
import Home from './components/Home';
import Form from './components/Form';
import Dashboard from './components/Dashboard';
import styles from './App.module.css';

function App() {
  const [recommendations, setRecommendations] = useState([]);

  return (
    <div className={styles.appContainer}>
      <div className={styles.card}>
        <h1 className={styles.title}>Job Skill Recommender</h1>
        <Home />
        <Form setRecommendations={setRecommendations} />
        <Dashboard recommendations={recommendations} />
      </div>
    </div>
  );
}

export default App;
