import { runPythonAI } from "./services/pythonService.js";

const test = async () => {
  const skills = ["python", "machine learning", "data analysis"];
  const jobs = [
    { id: 1, title: "Data Scientist", required_skills: "Python, Machine Learning, Deep Learning, SQL" },
    { id: 2, title: "Web Developer", required_skills: "HTML, CSS, JavaScript, React" },
    { id: 3, title: "AI Engineer", required_skills: "Python, Neural Networks, TensorFlow, Machine Learning" }
  ];

  try {
    const results = await runPythonAI(skills, jobs, 3);
    console.log("✅ AI Module Output:\n", results);
  } catch (error) {
    console.error("❌ Error calling AI module:", error);
  }
};

test();
