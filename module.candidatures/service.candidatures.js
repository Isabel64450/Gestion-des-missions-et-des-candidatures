class CandidatureService {
  constructor(candidatureRepository) {
    this.candidatureRepository = candidatureRepository;
  }

  async createCandidature(userId, missionId) {
    
    return await this.candidatureRepository.createCandidature(userId, missionId);
  }

  async getAllPendingCandidatures() {
  return await this.candidatureRepository.getAllPendingCandidatures();
}

async updateCandidatureStatus(candidatureId, newStatus) {
  return await this.candidatureRepository.updateCandidatureStatus(candidatureId, newStatus);
}
}

export default CandidatureService;