
const Usuario = require("../modules/model.usuario");
const bcrypt = require("bcrypt");
const generarJWT = require("../functions/generarJWT");

const login = async (req, res) => {

    const { correo, contasena } = req.body;

    try {

        // Buscar usuario en la base de datos
        const usuario = await Usuario.findOne({ correo });

        // Comprobar si existe el usuario
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario no encontrado"
            });
        }

        // Comprobar contraseña
        const validarContasena = await bcrypt.compare(
            contasena,
            usuario.contasena
        );

        if (!validarContasena) {
            return res.status(400).json({
                msg: "Contraseña incorrecta"
            });
        }

        // Generar token JWT
        const token = await generarJWT(usuario.id);

        // Login correcto
        return res.json({
            msg: "Login correcto",
            token
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            msg: "Error al iniciar sesión",
            error: error.message
        });

    }
};

module.exports = { login };
