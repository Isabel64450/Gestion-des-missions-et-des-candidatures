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
        if (err.code === 'ER_DUP_ENTRY'){
          const error = new Error("Cet utilisateur existe déjà.");
          error.name = "UserAlreadyExist";
          throw error
        }
        const error = new Error("Erreur lors de l'insertion dans la base de données");
        error.name = "DatabaseException";
        throw error
       
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
    err.name = "DatabaseException"
    throw err;
  }
}




}
export default UserRepository