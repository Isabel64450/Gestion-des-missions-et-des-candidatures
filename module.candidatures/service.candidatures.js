class CandidatureService {
  constructor(candidatureRepository) {
    this.candidatureRepository = candidatureRepository;
  }

  async postuler(userId, missionId) {
    const alreadyPending = await this.candidatureRepository.hasPendingCandidature(userId);
    
    if (alreadyPending) {
      throw new Error("Vous avez déjà une candidature en attente. Veuillez attendre une réponse avant de postuler à une autre mission.");
    }

    const candidatureId = await this.candidatureRepository.createCandidature(userId, missionId);
    return candidatureId;
  }

  async getAllPendingCandidatures() {
  return await this.candidatureRepository.getAllPendingCandidatures();
}

async updateCandidatureStatus(candidatureId, newStatus, associationIdFromToken) {
  const allowedStatuses = ['acceptée', 'refusée'];

  if (!allowedStatuses.includes(newStatus)) {
    throw new Error("Statut invalide. Seuls 'acceptée' ou 'refusée' sont autorisés.");
  }

 
  const ownerId = await this.candidatureRepository.getAssociationIdFromCandidature(candidatureId);

  if (!ownerId) {
    throw new Error("Candidature non trouvée ou mission inconnue.");
  }

  if (ownerId !== associationIdFromToken) {
    throw new Error("Vous n’êtes pas autorisé à modifier cette candidature.");
  }

 
  return await this.candidatureRepository.updateCandidatureStatus(candidatureId, newStatus);
}

async getPendingCandidaturesByAssociation(associationId) {
  return await this.candidatureRepository.findPendingCandidaturesByAssociation(associationId);
}

async getCandidaturesByBenevole(benevoleId) {
  const candidatures = await this.candidatureRepository.findCandidaturesByBenevole(benevoleId)
  const formattedCandidatures = candidatures.map(c=>({
    ...c, applied_at:new Date(c.applied_at).toLocaleDateString('fr-FR'),
    mission_date: new Date(c.mission_date).toLocaleDateString('fr-FR')
  }))
  
  
  
  return formattedCandidatures;
}


}

export default CandidatureService;