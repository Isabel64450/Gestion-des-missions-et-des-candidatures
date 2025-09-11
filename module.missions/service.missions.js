class MissionService {
  constructor(missionRepository) {
    this.missionRepository = missionRepository;
  }

  async createMission(missionData) {
   
    return await this.missionRepository.createMission(missionData);
  }

async updateMission(id, missionData) {
    const updated = await this.missionRepository.updateMission(id, missionData);

    if (!updated) {
      throw new Error("La mission n'existe pas ou n'a pas pu être modifiée");
    }

    return { id, ...missionData };
  }

async deleteMission(id) {
  const deleted = await this.missionRepository.deleteMission(id);

  if (!deleted) {
    throw new Error("Mission introuvable ou déjà supprimée");
  }

  return true;
}
async getAllMissions() {
    return await this.missionRepository.getAllMissions();
  }


async getMissionsByAssociation(associationId) {
  return this.missionRepository.findMissionsByAssociation(associationId);
}


}

export default MissionService;