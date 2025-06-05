import { User } from "../model/userModel.js";

export const create = async (req,res)=>{
    try{
        const newUser = new User(req.body); 
        const {email} = newUser; 

        const ExsistUser = await User.findOne({email}); 
        if(ExsistUser){
            return res.starus(400).json({errormessage:"User already exists with this email"});
        }
        const savedUser= await newUser.save();e
       
        res.status(201).json({message:"User created successfully", user: savedUser}); 

    }catch(error){
        res.status(500).json({errormessage:error.message});
    }
}

export const getAllUsers = async (req, res) => {
    try{
        const users = await User.find(); 
        if(!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json(users);                   

    }catch(error){
        res.status(500).json({errormessage:error.message});
    }
}

export const getUserById = async (req, res) => {
    try{
        const userId = req.params.id; 
        const userExists = await User.findById(userId); 
        if(!userExists) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(userExists); 

    }catch(error){
        res.status(500).json({errormessage:error.message});
    }
}

export const updateUser = async (req, res) => {
    try{
        const userId = req.params.id; 
        const updatedUser = await User.findById(userId); 
        if(!updatedUser) {
            return res.status(404).json({ message: "User not found" }); 
        }
         const updatedData = await User.findByIdAndUpdate(userId, req.body, { new: true }); 
        res.status(201).json({message:"User Updated successfully", user: updatedData}); 

    }catch(error){
        res.status(500).json({errormessage:error.message}); 
    }
}

export const deleteUser = async (req, res) => {

    try{
        const userId = req.params.id; 
        const updatedUser = await User.findById(userId); 
        if(!updatedUser) {
            return res.status(404).json({ message: "User not found" }); 
        }
         await User.findByIdAndDelete(userId, req.body, { new: true }); 
         res.status(200).json({message:"User Deleted successfully"}); 

    }catch(error){
        res.status(500).json({errormessage:error.message}); 
    }

}