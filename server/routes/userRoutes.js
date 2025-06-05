import express from 'express';

import { create, deleteUser, getAllUsers,getUserById,updateUser } from "../controller/usercontroller.js";

const router = express.Router();    // Create a new router instance

router.post("/user", create); // Define a POST route for creating a user
router.get("/users",getAllUsers); // Define a GET route for fetching all users
router.get("/user/:id", getUserById); // Define a GET route for fetching a user by ID
router.put("/update/user/:id", updateUser); // Define a PUT route for updating a user by ID
router.delete("/delete/user/:id",deleteUser); // Define a Delete route for deleting a user by ID
export default router; // Export the router to be used in the main application