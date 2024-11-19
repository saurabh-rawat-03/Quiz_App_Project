import app from "./app";
import connectDB from "./shared/db/connection";


const PORT = process.env.PORT || 4000;
connectDB();
app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`);
})