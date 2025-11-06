const entry = require('../models/entries.model.js'); // Importar el modelo de la BBDD


// GET http://localhost:3000/entries --> ALL
// GET http://localhost:3000/entries?email=hola@gmail.com --> por email
const getEntries = async (req, res) => {
    let entries;
    if (req.query.email) {
        entries = await entry.getEntriesByEmail(req.query.email);
    }
    else {
        entries = await entry.getAllEntries();
    }
    res.status(200).json(entries); // [] con las entries encontradas
}


const createEntry = async (req, res) => {
    const newEntry = req.body; // {title,content,email,category}
    const response = await entry.createEntry(newEntry);
    res.status(201).json({
        "items_created": response,
        data: newEntry
    });
}


const updateEntry = async (req, res) => {
    try {
        const updatedEntry = await entry.updateEntry(req.body); // req.body = { odlTitle, title, content, category }
        
        if (!updatedEntry) {
            return res.status(404).json({ message: "Entrada no encontrada" });
        }

        res.status(200).json({
            message: "Se ha modificado la entry 'Título de noticia' ",
            data: updatedEntry
        });
    } catch (err) {
        console.error("Error al actualizar la entrada:", err);
        res.status(500).json({ message: "Error al actualizar la entrada" });
    }
};


module.exports = {
    getEntries,
    createEntry,
    updateEntry,
    //deleteEntry, --> DELETE
    //updateEntry --> PUT
}