import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const adminExists = await User.findOne({ email: "admin@example.com" });
    if (adminExists) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      isAdmin: true,
    });

    console.log("✅ Admin user created successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();

