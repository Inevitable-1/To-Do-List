const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

let tasks = [];

app.use(express.static("public"));
app.use(express.json());

// Serve HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API - Add Task
app.post("/add", (req, res) => {
  const { task } = req.body;
  const id = Date.now(); // Unique ID
  tasks.push({ id, task });
  res.json({ tasks });
});

// API - Get Tasks
app.get("/tasks", (req, res) => {
  res.json({ tasks });
});

// API - Delete Task
app.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({ tasks });
});

// API - Update Task
app.put("/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { task } = req.body;
  tasks = tasks.map(t => t.id === id ? { ...t, task } : t);
  res.json({ tasks });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
