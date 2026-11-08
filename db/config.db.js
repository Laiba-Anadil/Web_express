const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONN);

        console.log("MongoDB conectado correctamente");

    } catch (error) {
        console.error("Error al conectar MongoDB:", error);
        throw error;
    }
};

module.exports = { dbConnection };
