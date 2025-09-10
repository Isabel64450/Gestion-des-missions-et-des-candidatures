class MissionRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async createMission(missionData) {
    const { title, description, date, association_id } = missionData;

    try {
      const [result] = await this.pool.query(
        `INSERT INTO missions (title, description, date, association_id)
         VALUES (?, ?, ?, ?)`,
        [title, description, date, association_id]
      );
      return result.insertId;
    } catch (err) {
      console.error('Erreur dans MissionRepository.createMission :', err.message);
      throw new Error("Erreur lors de la création de la mission");
    }
  }

async updateMission(id, missionData) {
    const { title, description, date } = missionData;

    try {
      const [result] = await this.pool.query(
        `UPDATE missions
         SET title = ?, description = ?, date = ?
         WHERE id = ?`,
        [title, description, date, id]
      );
      return result.affectedRows > 0;
    } catch (err) {
      console.error('Erreur dans MissionRepository.updateMission :', err.message);
      throw new Error('Erreur lors de la mise à jour de la mission');
    }
  }

async deleteMission(id) {
  try {
    const [result] = await this.pool.query(
      `DELETE FROM missions WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  } catch (err) {
    console.error('Erreur dans MissionRepository.deleteMission :', err.message);
    throw new Error("Erreur lors de la suppression de la mission");
  }
}


async getAllMissions() {
    try {
      const [rows] = await this.pool.query(`
        SELECT 
          m.id,
          m.title,
          m.description,
          m.date,
          u.name AS association_name,
          m.created_at
        FROM missions m
        JOIN users u ON m.association_id = u.id
        ORDER BY m.date ASC
      `);
      return rows;
    } catch (err) {
      console.error("Erreur dans MissionRepository.getAllMissions :", err.message);
      throw err;
    }
  }









}

export default MissionRepository;