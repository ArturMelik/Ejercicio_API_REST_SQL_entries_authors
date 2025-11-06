const author = require('../models/authors.model.js'); // Importar el modelo de la BBDD

// GET

const getAuthors = async (req, res) => {
    try {
        const { email } = req.query;
        let result;

        if (email) {
            // Buscar por email
            result = await author.getAuthorByEmail(email);
            if (!result) {
                return res.status(404).json({ message: "No se encontró ningún autor con ese email" });
            }
        } else {
            // Obtener todos
            result = await author.getAllAuthors();
        }

        res.status(200).json(result);
    } catch (err) {
        console.error("Error al obtener los autores:", err);
        res.status(500).json({ message: "Error al obtener los autores" });
    }
};

// POST (crear)
const createAuthor = async (req, res) => {
    try {
        const { name, surname, email, image } = req.body;

        if (!name || !surname || !email || !image) {
            return res.status(400).json({
                message: "Faltan campos obligatorios: name, surname, email, image"
            });
        }

        const newAuthor = await author.createAuthor({ name, surname, email, image });
        res.status(201).json({
            message: "Autor creado correctamente",
            data: newAuthor
        });
    } catch (err) {
        console.error("Error al crear el autor:", err);
        res.status(500).json({ message: "Error al crear el autor" });
    }
};




// PUT - Actualizar autor
const updateAuthor = async (req, res) => {
    try {
        const { name, surname, email, image } = req.body;

        // Validar que el campo existe en el body
        if (!email || email.trim() === "") {
            return res.status(400).json({
                message: "El campo 'email' es obligatorio para actualizar un autor"
            });
        }

        // Ejecutar la actualización en la BBDD
        const updatedCount = await author.updateAuthor({ name, surname, email, image });

        // Si no se encontró el email en la tabla
        if (updatedCount === 0) {
            return res.status(404).json({
                message: "No se encontró ningún autor con ese email"
            });
        }

        // Si se actualizó correctamente
        res.status(200).json({
            message: "Autor actualizado correctamente",
            items_updated: updatedCount
        });

    } catch (err) {
        console.error("Error al actualizar el autor:", err);
        res.status(500).json({ message: "Error al actualizar el autor" });
    }
};

//DELETE
const deleteAuthor = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "El campo 'email' es obligatorio para borrar un autor" });
        }

        const deleted = await author.deleteAuthor(email);

        if (deleted === 0) {
            return res.status(404).json({ message: "No se encontró ningún autor con ese email" });
        }

        res.status(200).json({
            message: "Autor eliminado correctamente",
            items_deleted: deleted
        });
    } catch (err) {
        console.error("Error al eliminar el autor:", err);
        res.status(500).json({ message: "Error al eliminar el autor" });
    }
};



module.exports = {
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
}