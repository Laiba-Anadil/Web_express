const Usuarios = require("../modules/model.usuario");

const buscarUsuario = async (busqueda, res) => {
    const regex = new RegExp(busqueda, "i");

    const usuarios = await Usuarios.find({
        $or: [{ nombre: regex }, { correo: regex }],
    });

    res.json({
        result: usuarios,
    });
};


const buscar = async (req, res) => {

    const { seccion, concepto } = req.params;

    switch (seccion) {
        case "usuarios":
            await buscarUsuario(concepto, res);
        break;
        default:
            res.status(500).json({
                msg: "No se encontró la búsqueda"
            });    
    }
}

module.exports = { buscar };