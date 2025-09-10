import getPool from './services/mariadb.pool.js';

import dotenv from 'dotenv';
dotenv.config();

const pool = getPool();


async function testMariaDBConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT DATABASE() AS db');
    console.log('Connecté à la base MariaDB :', rows[0].db); 
  } catch (err) {
    console.error('Erreur de connexion à MariaDB:', err.message);
  } finally {
    if (connection) connection.release();
  }
}

testMariaDBConnection();