const { Pool } = require("pg");

class NotesService {
  constructor() {
    this._pool = new Pool();
  }

  async getNotes(userId) {
    const result = await this._pool.query(
      `SELECT notes.* FROM notes 
      LEFT JOIN collaborations ON notes.id = collaborations.note_id 
      WHERE notes.owner = $1 OR collaborations.user_id = $1
      GROUP BY notes.id`,
      [userId]
    );
    return result.rows;
  }
}

module.exports = NotesService;
