import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const DRIVE_DIR = process.env.DRIVE_DIR;

app.get("/drive/api/files", (req, res) => {
  const dirPath = req.query.path
    ? path.join(DRIVE_DIR, req.query.path)
    : DRIVE_DIR;

  fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read directory" });
    }

    const fileList = files.map((file) => ({
      name: file.name,
      isDirectory: file.isDirectory(),
    }));

    res.json(fileList);
  });
});

export default app;
