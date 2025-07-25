// server/db.js
import dotenv from 'dotenv';
dotenv.config();   // ← .env를 여기서 먼저 로드!

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,                     // localhost
  port: Number(process.env.DB_PORT) || 3307,     // 3307 같이 커스텀 포트를 쓸 수도
  user: process.env.DB_USER,                     // root
  password: process.env.DB_PASSWORD,             // 정상적으로 '1234'가 들어옴
  database: process.env.DB_NAME,                 // recipe_recommend
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
