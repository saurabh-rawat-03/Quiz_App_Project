import app from "./app";
import  connectDB, { seedDatabase } from "./shared/db/connection";

const PORT = process.env.PORT || 4000;

connectDB();
seedDatabase();

app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`);
})
