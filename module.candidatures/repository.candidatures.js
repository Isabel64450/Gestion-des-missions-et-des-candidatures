class CandidatureRepository {
  constructor(pool) {
    this.pool = pool;
  }

 async createCandidature(userId, missionId) {
  try {
    
    const [mission] = await this.pool.query(
      "SELECT id FROM missions WHERE id = ?",
      [missionId]
    );
    if (mission.length === 0) {
      throw new Error("Mission introuvable");
    }

    
    const [user] = await this.pool.query(
      "SELECT id FROM users WHERE id = ?",
      [userId]
    );
    if (user.length === 0) {
      throw new Error("Utilisateur introuvable");
    }

    
    const [existing] = await this.pool.query(
      "SELECT id FROM candidatures WHERE user_id = ? AND mission_id = ?",
      [userId, missionId]
    );
    if (existing.length > 0) {
      throw new Error("Vous avez déjà postulé à cette mission");
    }

    
    const [result] = await this.pool.query(
      `INSERT INTO candidatures (mission_id, user_id)
       VALUES (?, ?)`,
      [missionId, userId]
    );

    return result.insertId;
  } catch (err) {
    console.error("Erreur dans CandidatureRepository.createCandidature :", err.message);
    throw err;
  }
}

async getAllPendingCandidatures() {
  try {
    const [rows] = await this.pool.query(`
      SELECT 
  c.id AS candidature_id,
  u.name AS association,
  m.title AS mission,
  a.name AS benevole,
  c.status,
  c.applied_at
FROM candidatures c
JOIN users u ON c.user_id = u.id           
JOIN missions m ON c.mission_id = m.id     
JOIN users a ON m.association_id = a.id    
WHERE c.status = 'en attente'
ORDER BY c.applied_at DESC;
    `);

    return rows;
  } catch (err) {
    console.error("Erreur dans CandidatureRepository.getAllPendingCandidatures :", err.message);
    throw err;
  }
}
async updateCandidatureStatus(candidatureId, newStatus) {
  try {
    const allowedStatuses = ['acceptée', 'refusée'];

    if (!allowedStatuses.includes(newStatus)) {
      throw new Error("Statut invalide. Seuls 'acceptée' ou 'refusée' sont autorisés.");
    }

    const [result] = await this.pool.query(
      `UPDATE candidatures
       SET status = ?
       WHERE id = ?`,
      [newStatus, candidatureId]
    );

    if (result.affectedRows === 0) {
      throw new Error("Candidature non trouvée");
    }

    return true;
  } catch (err) {
    console.error("Erreur dans CandidatureRepository.updateCandidatureStatus :", err.message);
    throw err;
  }
}












}

export default CandidatureRepository;