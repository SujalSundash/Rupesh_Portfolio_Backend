// seed/seedData.js

require("dotenv").config();
const mongoose = require("mongoose");
const connectDb = require("../config/db");
const Permission = require("../models/permission");
const Role = require("../models/Role");
const permissionData = require("../constants/permissionData");
const rolesData = require("../constants/rolesData");

const seedData = async () => {
  try {
    await connectDb();
    console.log("MongoDB Connected ✅");

    // =====================
    // SEED PERMISSIONS
    // =====================
    for (const permission of permissionData) {
      const exists = await Permission.findOne({ name: permission.name });
      if (!exists) {
        await Permission.create(permission);
      }
    }
    console.log("✅ Permissions seeded");

    // =====================
    // SEED ROLES
    // =====================
    for (const role of rolesData) {
      const exists = await Role.findOne({ name: role.name });
      if (!exists) {
        await Role.create({
          name: role.name,
          profileModel: role.profileModel || null,
          permissions: [],
        });
      }
    }
    console.log("✅ Roles seeded");

    // =====================
    // ATTACH PERMISSIONS TO ROLES
    // =====================
    const roles = await Role.find();
    for (const role of roles) {
      const roleFromData = rolesData.find((r) => r.name === role.name);
      if (roleFromData) {
        const permissions = await Permission.find({
          name: { $in: roleFromData.permissions },
        });
        role.permissions = permissions.map((p) => p._id);
        await role.save();
      }
    }
    console.log("✅ Permissions attached to roles");

  } catch (error) {
    console.error("❌ Error seeding data:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
    process.exit(0);
  }
};

seedData();