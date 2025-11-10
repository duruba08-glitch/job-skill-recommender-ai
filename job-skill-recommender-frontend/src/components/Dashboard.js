import React from 'react';
import styles from './Dashboard.module.css';

const Dashboard = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return <p className={styles.empty}>No recommendations yet.</p>;
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Job Recommendations</h3>
      <ul className={styles.list}>
        {recommendations.map((job) => (
          <li key={job.job_id} className={styles.card}>
            <div className={styles.header}>
              <strong className={styles.job}>{job.job}</strong>
              <span className={styles.score}>Score: {job.score.toFixed(2)}</span>
            </div>
            <div className={styles.meta}>Matched Skills: {job.matched_skills.join(', ')}</div>
            {job.missing_skills && job.missing_skills.length > 0 && (
              <div className={styles.missingWrap}>
                <div className={styles.missingLabel}>Missing Skills:</div>
                <div className={styles.badges}>
                  {job.missing_skills.map((s, i) => (
                    <span key={i} className={styles.badge}>{s}</span>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
