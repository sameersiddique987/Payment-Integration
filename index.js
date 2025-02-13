import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import router from './src/routes/routes.js';

dotenv.config(); 
 const app = express();
 const port = 3000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",  
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//routes
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})