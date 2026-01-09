import express from "express";
import multer from "multer";
import { exec } from "child_process";
import cors from "cors";

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const csvPath = req.file.path;

  console.log("📂 Uploaded CSV path:", csvPath);

  // ✅ Hard-coded Python path (correct)
  const scriptPath =
    "E:/Downloads/CLEAN LEDGER Application/ai/case_prioritization.py";

  console.log("🐍 Python script path:", scriptPath);

  exec(`python "${scriptPath}" "${csvPath}"`, (error, stdout, stderr) => {
    console.log("🟡 PYTHON STDERR:", stderr);
    console.log("🟢 PYTHON STDOUT:", stdout);

    // 🔴 Python execution error
    if (error) {
      return res.status(500).json({
        error: "Python execution failed",
        details: error.message,
        stderr,
      });
    }

    // 🔴 Python returned nothing (very common bug)
    if (!stdout || stdout.trim() === "") {
      return res.status(500).json({
        error: "Python returned empty output",
        stderr,
      });
    }

    try {
      const result = JSON.parse(stdout.trim());

      console.log("✅ FINAL JSON SENT TO FRONTEND:", result);

      res.json(result);
    } catch (err) {
      return res.status(500).json({
        error: "Invalid JSON from Python",
        rawOutput: stdout,
        stderr,
      });
    }
  });
});

app.listen(5000, () => {
  console.log("🚀 Backend running on port 5000");
});
