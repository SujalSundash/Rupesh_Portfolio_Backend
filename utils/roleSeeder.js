// seed/roleSeeder.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Role = require("../models/Role"); 
const connectDb = require("../config/db");

dotenv.config();

const roles = [
  { name: "admin" },
  { name: "editor" }, 
  {name: "user"}
];

const seedRoles = async () => {
  try {
    await connectDb();

    const count = await Role.countDocuments();
    if (count === 0) {
      await Role.insertMany(roles);
      console.log("Roles seeded successfully!");
    } else {
      console.log("Roles already exist. Skipping seeding.");
    }

    process.exit();
  } catch (error) {
    console.error("Role seeding error:", error);
    process.exit(1);
  }
};

seedRoles();