class CandidatureController {
  constructor(candidatureService) {
    this.candidatureService = candidatureService;
  }

  async createCandidature(req, res,next) {
    try {
      const userId = req.user.id; 
             
      const { missionId } = req.body;     

      if (!missionId) {
         const error = new Error("Mission manquante");
        error.name = "ArgumentRequired"; 
        throw error;
      }

      const candidatureId = await this.candidatureService.postuler(userId, missionId);

      return res.status(201).json({
        message: "Candidature envoyée avec succès",
        candidatureId
      });

    } catch (error) {
      next(error)
    }
  }

async getAllPendingCandidatures(req, res,next) {
  try {
    const candidatures = await this.candidatureService.getAllPendingCandidatures();

    if (candidatures.length === 0) {
      return res.status(200).json({ message: "Aucune candidature en attente pour le moment." });
    }

    res.status(200).json(candidatures);
  } catch (error) {
    next(error)
  }
}
async updateCandidatureStatus(req, res, next) {
  const { id } = req.params;
  const { status } = req.body;
  const associationId = req.user.id

  try {
    await this.candidatureService.updateCandidatureStatus(id, status, associationId);
    res.status(200).json({ message: "Statut de la candidature mis à jour avec succès" });
  } catch (error) {
    next(error)
  }
}

async getPendingCandidaturesForAssociation(req, res, next) {
  try {
    const associationId = req.user.id; 

    const candidatures = await this.candidatureService.getPendingCandidaturesByAssociation(associationId);

    if (candidatures.length === 0) {
      return res.status(200).json({ message: "Aucune candidature en attente pour vos missions." });
    }

    res.status(200).json(candidatures);
  } catch (error) {
   next(error)
  }
}

async getCandidaturesForBenevole(req, res, next) {
  try {
    const benevoleId = req.user.id;  

    const candidatures = await this.candidatureService.getCandidaturesByBenevole(benevoleId);

    if (candidatures.length === 0) {
      return res.status(200).json({ message: "Vous n'avez pas encore postulé à une mission." });
    }

    res.status(200).json(candidatures);
  } catch (error) {
    next(error)
  }
}

}

export default CandidatureController;