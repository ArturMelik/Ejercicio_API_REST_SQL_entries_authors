const queries = require('../queries/authors.queries.js') // Queries SQL
const pool = require("../config/db_pgsql.js") //


// GET ALL
const getAllAuthors = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getAllAuthors);
        result = data.rows; // devuelve un array con todos los autores
    } catch (err) {
        console.error("Error en getAllAuthors:", err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// GET BY EMAIL
const getAuthorByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getAuthorByEmail, [email]);
        result = data.rows[0]; // devuelve un solo autor
    } catch (err) {
        console.error("Error en getAuthorByEmail:", err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

//POST
const createAuthor = async (authorData) => {
    const { name, surname, email, image } = authorData;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.createAuthor, [name, surname, email, image]);
        result = data.rows[0];
    } catch (err) {
        console.error("Error en createAuthor:", err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};


// UPDATE AUTHOR
const updateAuthor = async (authorData) => {
    const { name, surname, email, image } = authorData;
    let client, result;

    try {
        client = await pool.connect();
        const data = await client.query(queries.updateAuthor, [name, surname, image, email]);
        result = data.rowCount; // Devuelve el autor actualizado
    } catch (err) {
        console.error("Error en updateAuthor:", err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const deleteAuthor = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteAuthor, [email]);
        result = data.rowCount; // número de filas eliminadas
    } catch (err) {
        console.error("Error en deleteAuthor:", err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};


const author = {
    getAllAuthors,
    getAuthorByEmail,
    createAuthor,
    updateAuthor,
    deleteAuthor

    
}

module.exports = author;