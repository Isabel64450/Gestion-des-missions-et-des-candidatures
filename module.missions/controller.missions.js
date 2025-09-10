class MissionController {
  constructor(missionService) {
    this.missionService = missionService;
  }

  async createMission(req, res) {
    try {
      const missionData = req.body;

      

      const missionId = await this.missionService.createMission(missionData);

      res.status(201).json({
        message: "Mission créée avec succès",
        mission: { id: missionId, ...missionData }
      });
    } catch (error) {
      console.error('MissionController.createMission :', error.message);
      res.status(500).json({ message: "Erreur lors de la création de la mission" });
    }
  }

 async updateMission(req, res) {
    const missionId = req.params.id;
    const missionData = req.body;

    try {
      const updatedMission = await this.missionService.updateMission(missionId, missionData);
      res.status(200).json({
        message: 'Mission mise à jour avec succès',
        mission: updatedMission
      });
    } catch (error) {
      console.error('MissionController.updateMission :', error.message);
      res.status(500).json({ message: error.message });
    }
  }

async deleteMission(req, res) {
  const missionId = req.params.id;

  try {
    await this.missionService.deleteMission(missionId);

    res.status(200).json({
      message: "Mission supprimée avec succès"
    });
  } catch (error) {
    console.error('MissionController.deleteMission :', error.message);
    res.status(500).json({ message: error.message });
  }
}

async getAllMissions(req, res) {
    try {
      const missions = await this.missionService.getAllMissions();
      res.status(200).json(missions);
    } catch (error) {
      console.error("Erreur dans MissionController.getAllMissions :", error.message);
      res.status(500).json({ message: "Erreur lors de la récupération des missions" });
    }
  }



}

export default MissionController;