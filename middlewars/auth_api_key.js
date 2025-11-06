//http://localhost:3000/api/books?API_KEY=123abc

const checkApiKey = function (req, res, next) {
    // Comprobar si existe API KEY en BBDD pasada por cliente
    // ... 
    // select * from users where API_KEY=API_KEY
    console.log(req.query);

    // Comprobar si no se envía API_KEY
    if(!req.query.API_KEY){
        res.status(401).send("Error. API KEY no proveída");
        return;
    }
    // if (req.query.API_KEY === "123abc") {
    if (req.query.API_KEY === process.env.API_KEY) { // en .env es "miclave123"
        next(); // Pasa a la siguiente tarea
    } else {
        //Mando mensaje de error
        res.status(401).send("Error. API KEY errónea");
    }
}

module.exports = checkApiKey;