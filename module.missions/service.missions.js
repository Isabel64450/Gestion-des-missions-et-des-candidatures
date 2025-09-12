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
  const missions = await this.missionRepository.getAllMissions();

  
  const formattedMissions = missions.map(mission => ({
    ...mission,
    date: new Date(mission.date).toLocaleDateString('fr-FR'),
    created_at: new Date(mission.created_at).toLocaleDateString('fr-FR')
  }));

  return formattedMissions;
}

async getMissionsByAssociation(associationId) {
  const missions = await this.missionRepository.findMissionsByAssociation(associationId);
  const formatedDateMissions = missions.map(missions=>({...missions,date:new Date(missions.date).toLocaleDateString('fr-FR'),
    created_at:new Date(missions.created_at).toLocaleDateString('fr-FR')
  }))
  return formatedDateMissions
}


}

export default MissionService;