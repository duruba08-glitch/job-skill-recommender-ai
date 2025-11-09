import { spawn } from "child_process";

// Path to your Python AI module
const AI_PATH =
  "/Users/airm1/Desktop/project/my practice project/job_skill_recommender/job-skill-recommender-ai/ai_module.py";

export const runPythonAI = (skills, jobs, top_k) => {
  return new Promise((resolve, reject) => {
    const py = spawn("python3", [
      AI_PATH,
      JSON.stringify(skills),
      JSON.stringify(jobs),
      top_k.toString(),
    ]);

    let data = "";
    let error = "";

    py.stdout.on("data", (chunk) => (data += chunk.toString()));
    py.stderr.on("data", (chunk) => (error += chunk.toString()));

    py.on("close", (code) => {
      if (code !== 0 || error) {
        console.error("❌ Python error:", error);
        return reject(error);
      }
      try {
        const parsed = JSON.parse(data);
        resolve(parsed);
      } catch (err) {
        reject("Invalid Python output: " + data);
      }
    });
  });
};
