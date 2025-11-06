// const { Pool } = require('pg');
const queries = require('../queries/entries.queries.js') // Queries SQL
const pool = require("../config/db_pgsql") //

// const pool = new Pool({
//     host: 'localhost',
//     user: 'postgres',
//     port: '5432',
//     database: 'postgres',
//     password: '123456'
//   });


// GET
const getAllEntries = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllEntries)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// GET
const getEntriesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getEntriesByEmail, [email])
        result = data.rows
        
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release(); // Cierra la base de conexion
    }
    return result
}

// CREATE
const createEntry = async (entry) => {
    const { title, content, email, category } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createEntry,[title, content, email, category])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// UPDATE
const updateEntry = async (entry) => {
    const {title, content, category, oldTitle } = entry;
    let client, result;

    try {
        client = await pool.connect();
        const data = await client.query(queries.updateEntry, [
            title,
            content,
            category,
            oldTitle
        ]);
        result = data.rows[0]; // Devuelve el registro actualizado
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }

    return result;
};



// DELETE
//UPDATE

const entries = {
    getEntriesByEmail,
    getAllEntries,
    createEntry,
    updateEntry
    //deleteEntry
    //updateEntry
}

module.exports = entries;




