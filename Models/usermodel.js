import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    role:{
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user"
    },
    name:{
        required: true,
        type: String
    },
    email: {
        type: String,
        required : true
    },
    image: {
        type: String,
        
    }

})

export default mongoose.models.User || mongoose.model("User", userSchema);