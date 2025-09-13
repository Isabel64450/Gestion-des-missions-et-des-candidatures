import argon2 from 'argon2';
import jwt from 'jsonwebtoken'

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userData) {
    try {
      
      const hashedPassword = await argon2.hash(userData.password);
      const userToInsert = {
        ...userData,
        password: hashedPassword,
      };

      const userId = await this.userRepository.createUser(userToInsert);
      return {
        id: userId,
        name: userData.name,
        email: userData.email,
        role: userData.role
      };
    } catch (error) {
      
      throw error
    }
  }

async loginUser(email, password){
    const user = await this.userRepository.getUserByEmail(email)
    
    if(!user) {
      const err = new Error("Une erreur s'est produite : l'adresse e-mail et/ou le mot de passe ne correspondent pas.")
     err.name="Unauthorized";
throw err;
}

    const validPassword = await argon2.verify(user.password,password) 

if(!validPassword) {

const err = new Error("Une erreur s'est produite : l'adresse e-mail et/ou le mot de passe ne correspondent pas.")  
 err.name ="Unauthorized"  ;
 throw err;
}

  const token = jwt.sign(
      { id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
       },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );   
return {
      token,
      user: {
        id: user.id,
        name: user.name,              
        email: user.email,
        role:user.role
      }
}}







}

export default UserService;