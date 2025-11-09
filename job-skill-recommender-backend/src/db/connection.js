import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  port: 8889, // MAMP default
  user: "root",
  password: "root",
  database: "job_recommender",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Database connected successfully!");
});

export default db;
