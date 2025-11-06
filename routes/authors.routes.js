const express = require('express');
// Rutas de productos
const authorController = require("../controllers/authors.controller");
const router = express.Router();


// http://localhost:3000/api/authors

router.get('/', authorController.getAuthors);
router.post('/', authorController.createAuthor);
router.put('/', authorController.updateAuthor);
router.delete('/', authorController.deleteAuthor);



module.exports = router;