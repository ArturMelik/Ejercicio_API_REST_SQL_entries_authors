const queries = {
    getAllAuthors:`
    SELECT * FROM authors`,
    getAuthorByEmail: `
        SELECT * FROM authors WHERE email = $1
    `,
    createAuthor: `
        INSERT INTO authors (name, surname, email, image)
        VALUES ($1, $2, $3, $4)
    `,
    updateAuthor: `
        UPDATE authors
        SET name = $1, surname = $2, image = $3
        WHERE email = $4
    `,
    deleteAuthor: `
    DELETE FROM authors
    WHERE email = $1`



    
}

module.exports = queries;