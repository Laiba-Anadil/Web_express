const jwt = require('jsonwebtoken');

const Usuario = require("../modules/model.usuario");

const validarJWT = async (req, res, next) => {
    const token = req.header('token');

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.KEYPRIVATETOKEN);
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(401).json({
                msg: "el usuario no existe en la DB"
            });
        }
        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: "Token no válido"
        });
    }    
}

module.exports = { validarJWT };