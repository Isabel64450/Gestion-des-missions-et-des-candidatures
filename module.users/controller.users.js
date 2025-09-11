class UserController {
  constructor(userService) {
    this.userService = userService;
  }


  async createUser(req, res) {
    const userData = req.body;

    try {
      const newUser = await this.userService.createUser(userData);
      res.status(201).json({
        message: 'Utilisateur créé avec succès',
        user: newUser,
      });
    } catch (error) {
      console.error('Erreur dans UserController.createUser :', error.message);
      res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur' });
    }
  }

async loginUser(req, res) {
  try {    
    const { email, password } = req.body;    
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }
    const {token, user}=await this.userService.loginUser(email, password)
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, 
      maxAge: 3600000 
    })
    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }
    const {id,...userWithoutId}=user
    return res.json({message:'Connexion réussie', user:userWithoutId})    
      
  } catch (err) {
    console.error("Erreur de connexion :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}  

async logoutUser(req, res) {
  try {
    res.clearCookie('token'); 
    res.status(200).json({ message: 'Déconnexion réussie' });
  } catch (err) {
    console.error('Erreur lors de la déconnexion:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}








}

export default UserController;