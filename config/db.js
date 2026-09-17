import mongoose from "mongoose";

export const conectarDB = async () => {
  try {
    const conexion = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`🟢 Base de datos conectada: ${conexion.connection.name}`);

  } catch (error) {
    console.error(`🔴 Error: ${error.message}`);
    process.exit(1);
  }
};

