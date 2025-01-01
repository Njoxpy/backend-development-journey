const express = require("express")
const app = express()

const PORT = process.env.PORT || 4000

app.get("/api/v1/", (req, res) => {
    res.send({message:"backend development journey"})
})

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})