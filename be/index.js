import express from 'express';
import UserRoutes from './routes/userRoutes.js';
import connectToDB from './database/db.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173",  // your React app URL
  credentials: true,                // if you send cookies/auth headers
}));
app.use(express.json());
dotenv.config();
connectToDB();


app.get('/',(req,res)=>{
    res.send("Hello Server is running");
})

app.use("/api/users", UserRoutes);



app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
})