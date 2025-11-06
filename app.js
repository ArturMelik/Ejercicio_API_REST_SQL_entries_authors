const express = require("express");  // require expres -> importa el package express.
const app = express(); // Crea el servidor

const port = 3000; //Puerto de pruebas

//Para leer fichero.env
require("dotenv").config();

app.use(express.json());

//Middlewares
const error404 = require("./middlewars/error404.js")

const morgan = require("./middlewars/morgan.js")
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));




const entriesRoutes = require("./routes/entries.routes")
const authorRoutes = require("./routes/authors.routes.js")

app.use("/api/entries", entriesRoutes);
app.use("/api/authors", authorRoutes)




app.use(error404);


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});