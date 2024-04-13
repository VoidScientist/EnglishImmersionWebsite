const express = require("express");
const app = express();

const GLOBALS = require("../GLOBALS.json");

const fs = require("fs/promises");

const PORT = 5000;

async function getFile(req, res) {

    const filename = req.params.filename;
    const path = GLOBALS.project_dir + "/app/" + filename;

    var fileExist = false;

    await fs.access(path)
    .then(() => fileExist = true)
    .catch(() => console.log("file doesn't exist."));

    if (fileExist) {
        res.sendFile(path);
        return;
    }

    res.send("<h1>Error 404: File doesn't exist.</h1>");

}

function getIndex(req, res) {

    res.sendFile(GLOBALS.project_dir + "/app/index.html");

}

app.get("/", getIndex);
app.get("/:filename", getFile);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))