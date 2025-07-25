// server/index.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import db from './db.js';

import authRouter            from './routes/auth.js';
import recipeRoutes          from './routes/recipes.js';
import userIngredientsRouter from './routes/userIngredients.js';
import ingredientsRouter     from './routes/ingredients.js';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// CORS + JSON body 파싱
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// 라우터
app.use('/auth',             authRouter);
app.use('/recipes',          recipeRoutes);
app.use('/api/user-ingredients', userIngredientsRouter);
app.use('/api/ingredients',  ingredientsRouter);

// 테스트용
app.get('/test', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json({ message: 'DB 연결 성공!', result: rows[0].result });
  } catch (err) {
    res.status(500).json({ message: 'DB 연결 실패', error: err.message });
  }
});

// 루트
app.get('/', (req, res) => res.send('백엔드 서버 작동 중입니다.'));

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log('✅ 서버 실행 중: http://localhost:3000');
});
