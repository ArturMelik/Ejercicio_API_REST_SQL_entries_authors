const entry = require('../models/entries.model.js'); // Importar el modelo de la BBDD


// GET http://localhost:3000/api/entries? --> ALL
// GET http://localhost:3000/api/entries?email=hola@gmail.com --> por email
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


//CREAR

const createEntry = async (req, res) => {
    const newEntry = req.body; // {title,content,email,category}
    const response = await entry.createEntry(newEntry);
    res.status(201).json({
        "items_created": response,
        data: newEntry
    });
}



//UPDATE

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


//DELETE
const deleteEntry = async (req, res) => {
    try {
        const { title } = req.body; // o req.query.title si lo prefieres
        if (!title) {
            return res.status(400).json({ message: "Debe proporcionar el título a eliminar" });
        }

        const deleted = await entry.deleteEntry(title);

        if (deleted === 0) {
            return res.status(404).json({ message: "No se encontró ninguna entrada con ese título" });
        }

        res.status(200).json({ message: `Entrada '${title}' eliminada correctamente` });
    } catch (err) {
        console.error("Error al eliminar la entrada:", err);
        res.status(500).json({ message: "Error al eliminar la entrada" });
    }
};



module.exports = {
    getEntries,
    createEntry,
    updateEntry,
    deleteEntry,
}