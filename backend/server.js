import express from "express";
import multer from "multer";
import { exec } from "child_process";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
  const csvPath = req.file.path;

  const scriptPath = path.join(
    process.cwd(),
    "..",
    "ai",
    "case_prioritization.py"
  );

  exec(
    `python "${scriptPath}" "${csvPath}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
        return res.status(500).json({ error: error.message });
      }

      try {
        const result = JSON.parse(stdout.trim());
        res.json(result);
      } catch (err) {
        res.status(500).json({
          error: "Invalid JSON from Python",
          raw: stdout,
        });
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
