const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// DB Connection
const conn = require("./db/conn");
conn;

// Routes
const routes = require("./routes/router");
app.use("/api", routes);

const port = 3048;

app.listen(port, function(){
    console.log(`Servidor Online na porta ${port} !`);
});
