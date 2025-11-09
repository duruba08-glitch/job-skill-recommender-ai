import express from "express";
import cors from "cors";
import recommendRoutes from "./routes/recommend.js";

const app = express();
app.use(cors());
app.use(express.json());

// simple health route for debugging
app.get("/", (req, res) => res.status(200).send({ ok: true, message: "Job recommender backend running" }));

// Link routes
app.use("/api", recommendRoutes);

const PORT = process.env.PORT || 5050;

const server = app.listen(PORT, () =>
	console.log(`✅ Server running on http://localhost:${PORT}`)
);

server.on("error", (err) => {
	if (err.code === "EADDRINUSE") {
		console.error(`❌ Port ${PORT} is already in use. Try setting PORT env or choose a different default.`);
	} else {
		console.error("❌ Server error:", err);
	}
});

console.log("🚀 Ready to handle job recommendations!");