import React, { useState } from 'react';
import axios from '../api';
import styles from './Form.module.css';

const Form = ({ setRecommendations }) => {
  const [skills, setSkills] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/recommend', { skills: skills.split(',') });
      setRecommendations(res.data.recommendations);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type='text'
        placeholder='Enter your skills (comma separated)'
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
      <button className={styles.button} type='submit'>Get Recommendations</button>
    </form>
  );
};

export default Form;
