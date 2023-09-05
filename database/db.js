const mysql = require("mysql2/promise");
require("dotenv").config();

// Configuración de la conexión a la base de datos MySQL utilizando un pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 20, // Número máximo de conexiones en el db
  waitForConnections: true,
  queueLimit: 0,
});

const getAgendasForToday = async () => {
  try {
    // Obtenemos la fecha actual en formato MySQL (YYYY-MM-DD)
    const currentDate = new Date().toISOString().split("T")[0];
    const query = `SELECT * FROM AgendaPeriodica WHERE DATE(Fechaini) = ?`;
    const [rows] = await pool.execute(query, [currentDate]);

    return rows;
  } catch (error) {
    console.error(`Error al realizar la consulta y es el siguiente ${error}`);
    throw new Error("Error al obtener los datos de la agenda");
  }
};

module.exports = getAgendasForToday;
