import db from "../db/connection.js";
import { runPythonAI } from "../services/pythonService.js";

export const recommendJobs = async (req, res) => {
  try {
    // Guard against missing/invalid JSON body to avoid a server-side crash
    const { skills, top_k } = req.body ?? {};

    if (!req.body) {
      return res.status(400).json({ error: "Request body is required and must be JSON." });
    }

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ error: "Please provide a valid list of skills." });
    }

    // Fetch all jobs from DB
    const [jobs] = await db.promise().query("SELECT id, title, required_skills FROM jobs");

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ error: "No jobs found in database." });
    }

    // Call Python AI
    const recommendations = await runPythonAI(skills, jobs, top_k || 5);

    res.status(200).json({
      success: true,
      total: recommendations.length,
      recommendations,
    });
  } catch (error) {
    console.error("❌ Backend error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
