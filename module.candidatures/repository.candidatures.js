class CandidatureRepository {
  constructor(pool) {
    this.pool = pool;
  }

async hasPendingCandidature(userId) {
    const [result] = await this.pool.query(
      'SELECT * FROM candidatures WHERE user_id = ? AND status = "En attente"',
      [userId]
      
    );
    
    return result.length > 0;
    
  }

async createCandidature(userId, missionId) {
    const result = await this.pool.query(
      'INSERT INTO candidatures (user_id, mission_id, status) VALUES (?, ?, "En attente")',
      [userId, missionId]
    );
    return result.insertId; }



async getAllPendingCandidatures() {
  try {
    const [rows] = await this.pool.query(`
      SELECT 
  c.id AS candidature_id,
  u.name AS benevole,
  m.title AS mission,
  a.name AS association,
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

async findPendingCandidaturesByAssociation(associationId) {
  const [rows] = await this.pool.query(
    `
    SELECT 
  c.*, 
  u.name AS benevole_name, 
  m.title AS mission_title
FROM candidatures c
JOIN missions m ON c.mission_id = m.id
JOIN users u ON c.user_id = u.id
WHERE m.association_id = ? AND c.status = 'en attente';
    `,
    [associationId]
  );

  return rows;
}

async getAssociationIdFromCandidature(candidatureId) {
  const [rows] = await this.pool.query(
    `
    SELECT m.association_id
    FROM candidatures c
    JOIN missions m ON c.mission_id = m.id
    WHERE c.id = ?
    `,
    [candidatureId]
  );

  if (rows.length === 0) return null;

  return rows[0].association_id;
}

async findCandidaturesByBenevole(benevoleId) {
  const [rows] = await this.pool.query(
    `
    SELECT 
      c.*, 
      m.title AS mission_title, 
      m.date AS mission_date,
      m.description AS mission_description
    FROM candidatures c
    JOIN missions m ON c.mission_id = m.id
    WHERE c.user_id = ?
    ORDER BY c.applied_at DESC
    `,
    [benevoleId]
  );
  return rows;
}






}

export default CandidatureRepository;