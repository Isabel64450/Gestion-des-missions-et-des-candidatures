class CandidatureController {
  constructor(candidatureService) {
    this.candidatureService = candidatureService;
  }

  async createCandidature(req, res) {
    const { user_id, mission_id } = req.body;

    if (!user_id || !mission_id) {
      return res.status(400).json({ message: "user_id et mission_id sont requis" });
    }

    try {
      const candidatureId = await this.candidatureService.createCandidature(user_id, mission_id);
      res.status(201).json({
        message: "Candidature créée avec succès",
        candidature: { id: candidatureId, user_id, mission_id, statut: "En attente" }
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

async getAllPendingCandidatures(req, res) {
  try {
    const candidatures = await this.candidatureService.getAllPendingCandidatures();
    res.status(200).json(candidatures);
  } catch (error) {
    console.error("Erreur dans CandidatureController.getAllPendingCandidatures :", error.message);
    res.status(500).json({ message: "Erreur lors de la récupération des candidatures en attente" });
  }
}
async updateCandidatureStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await this.candidatureService.updateCandidatureStatus(id, status);
    res.status(200).json({ message: "Statut de la candidature mis à jour avec succès" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


}

export default CandidatureController;