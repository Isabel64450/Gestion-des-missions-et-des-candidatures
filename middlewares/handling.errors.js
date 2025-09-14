const errorHandler = (err, req, res, next) => {
  console.error('Erreur capturée :', err.name, '-', err.message);

  switch (err.name) {
    case 'ArgumentRequired':
      return res.status(400).json({ message: 'Données requises manquantes' });

    case 'DatabaseException':
      return res.status(500).json({ message: 'Erreur de base de données' });

    case 'UserAlreadyExist':
      return res.status(409).json({ message: 'Utilisateur (email) déjà existant' });

    case 'UserNotFound':
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    
      case 'NotFound':  
    return res.status(404).json({ message: err.message || 'Ressource introuvable' });

    case 'Unauthorized':
      return res.status(401).json({ message: 'Accès non autorisé' });

    case 'Forbidden':
      return res.status(403).json({ message: err.message });

    case 'ValidationError':
      return res.status(422).json({ message: err.message });

    default:
      return res.status(500).json({ message: 'Erreur serveur inattendue' });
  }
};

export default errorHandler;