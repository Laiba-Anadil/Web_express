const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuarioSchema = new Schema({
  nombre: String, // String is shorthand for {type: String}
  correo: String,
  contasena: String,
  rol: String,
  foto: String,
});

module.exports = mongoose.model("Usuario", usuarioSchema);