import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import router from './src/routes/routes.js';

dotenv.config(); 
 const app = express();
 const port = 3000;

app.use(express.json());

// CORS Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});
// app.use(cors({
//   origin: "http://localhost:5173",  
//   methods: ["GET", "POST"],
//   allowedHeaders: ["Content-Type"]
// }));
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//routes
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})