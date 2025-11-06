const { updateEntry } = require("../models/entries.model");

const queries = {
        getAllEntries: `SELECT 
  e.title,
  e.content,
  e.date,
  e.category,
  a.name,
  a.surname,
  a.email AS email_author,
  a.image
FROM entries e
JOIN authors a ON e.id_author = a.id_author;`,
      getEntriesByEmail: `SELECT 
  e.title, e.content, e.date, e.category,
  a.name, a.surname, a.email AS email_author, a.image
FROM entries e
JOIN authors a ON e.id_author = a.id_author
WHERE a.email = $1;`,
      updateEntry: `UPDATE entries
SET content = $1, category = $2, date = $3
WHERE title = $4;`

    
}

module.exports = queries;