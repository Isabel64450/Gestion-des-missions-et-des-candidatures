class MissionController {
  constructor(missionService) {
    this.missionService = missionService;
  }

  async createMission(req, res, next) {
    try {
      const user =req.user;
      const missionData = req.body;
     if (user.role !== 'association') {
      const error = new Error("Seules les associations peuvent créer des missions.");
        error.name = 'Forbidden'; 
        throw error;
    }      
     missionData.association_id =user.id;
      const missionId = await this.missionService.createMission(missionData);
      const { association_id, ...missionWithoutAssociationId } = missionData;
      res.status(201).json({
        message: "Mission créée avec succès",
        mission: { id: missionId, ...missionWithoutAssociationId }
      });
    } catch (error) {
      next(error)
    }
  }

 async updateMission(req, res, next) {
    const missionId = req.params.id;
    const missionData = req.body;

    try {
      const updatedMission = await this.missionService.updateMission(missionId, missionData);
      res.status(200).json({
        message: 'Mission mise à jour avec succès',
        mission: updatedMission
      });
    } catch (error) {
      next(error)
    }
  }

async deleteMission(req, res, next) {
  const missionId = req.params.id;

  try {
    await this.missionService.deleteMission(missionId);

    res.status(200).json({
      message: "Mission supprimée avec succès"
    });
  } catch (error) {
    next(error)
  }
}

async getAllMissions(req, res, next) {
    try {
      const missions = await this.missionService.getAllMissions();
      res.status(200).json(missions);
    } catch (error) {
      next(error)
    }
  }


async getMissionsByAssociation(req, res, next) {
  try {
    const associationId = req.user.id; 

    const missions = await this.missionService.getMissionsByAssociation(associationId);
if (missions.length === 0) {
      return res.status(200).json({ message: "Votre association n'ai pas de mission pour le moment." });
    }
    const missionsWithoutAssoId = missions.map(({ association_id, ...rest }) => rest);
    res.status(200).json(missionsWithoutAssoId);
  } catch (error) {
    next(error)
  }
}
}

export default MissionController;