class UserRepository{
constructor(pool){
    this.pool=pool
}
async createUser(userData){
    const{name, email,password,role}=userData
    try{
        const[result]= await this.pool.query(`INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?)`,[name,email,password,role])
    return result.insertId
    }
    catch(err){
        console.error('Erreur dans UserRepository.createUser :', err.message);
    throw new Error("Erreur lors de l'insertion de l'utilisateur");
    }
}
async getUserByEmail(email) {
  try {
    const [rows] = await this.pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0] || null; 
  } catch (err) {
    console.error("Erreur dans UserRepository.getUserByEmail :", err.message);
    throw new Error("Erreur lors de la récupération de l'utilisateur par email");
  }
}




}
export default UserRepository