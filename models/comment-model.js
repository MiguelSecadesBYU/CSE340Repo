const pool = require("../database/")

async function createComment(inv_id, comment) {
    const result = await pool.query(
        'INSERT INTO comments (inv_id, comment) VALUES ($1, $2) RETURNING *',
        [inv_id, comment]
    );
    return result.rows[0];
}

async function findByInventoryId(inv_id) {
    const result = await pool.query(
        'SELECT * FROM comments WHERE inv_id = $1',
        [inv_id]
    );
    return result.rows;
}

module.exports = { createComment, findByInventoryId };
