const express = require('express');
// Rutas de productos
const entriesController = require("../controllers/entries.controller");
const router = express.Router();


// http://localhost:3000/api/entries

router.get('/', entriesController.getEntries);
router.post('/', entriesController.createEntry);
router.put('/', entriesController.updateEntry);
router.delete('/', entriesController.deleteEntry);


module.exports = router;


