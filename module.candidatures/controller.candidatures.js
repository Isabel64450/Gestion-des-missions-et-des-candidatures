class CandidatureController {
  constructor(candidatureService) {
    this.candidatureService = candidatureService;
  }

  async createCandidature(req, res) {
    try {
      const userId = req.user.id; 
             
      const { missionId } = req.body;     

      if (!missionId) {
        return res.status(400).json({ error: "Mission manquante" });
      }

      const candidatureId = await this.candidatureService.postuler(userId, missionId);

      return res.status(201).json({
        message: "Candidature envoyée avec succès",
        candidatureId
      });

    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

async getAllPendingCandidatures(req, res) {
  try {
    const candidatures = await this.candidatureService.getAllPendingCandidatures();

    if (candidatures.length === 0) {
      return res.status(200).json({ message: "Aucune candidature en attente pour le moment." });
    }

    res.status(200).json(candidatures);
  } catch (error) {
    console.error("Erreur dans CandidatureController.getAllPendingCandidatures :", error.message);
    res.status(500).json({ message: "Erreur lors de la récupération des candidatures en attente" });
  }
}
async updateCandidatureStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const associationId = req.user.id

  try {
    await this.candidatureService.updateCandidatureStatus(id, status, associationId);
    res.status(200).json({ message: "Statut de la candidature mis à jour avec succès" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
}

async getPendingCandidaturesForAssociation(req, res) {
  try {
    const associationId = req.user.id; 

    const candidatures = await this.candidatureService.getPendingCandidaturesByAssociation(associationId);

    if (candidatures.length === 0) {
      return res.status(200).json({ message: "Aucune candidature en attente pour vos missions." });
    }

    res.status(200).json(candidatures);
  } catch (error) {
    console.error('CandidatureController.getPendingCandidaturesForAssociation:', error.message);
    res.status(500).json({ message: 'Erreur lors de la récupération des candidatures.' });
  }
}







}

export default CandidatureController;