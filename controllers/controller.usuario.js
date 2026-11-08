
const Usuario = require('../modules/model.usuario');
const bcrypt = require('bcrypt');

const usuarioGet = async (req, res) => {
    const {
        inicio = 0,
        numreg =2
    } = req.query;
    const query = {}
    const usuario = await Usuario.find(query, null, { skip: inicio, limit: numreg }).exec();
    const regToal = await Usuario.estimatedDocumentCount();


    res.json({
        usuario,
        total: regToal
    });
};


const usuarioPost = async (req, res) => {
    console.log("NUEVO CONTROLLER POST EJECUTADO");

    try {
        const { nombre, correo, contasena, rol, foto } = req.body;

        const usuario = new Usuario({
            nombre,
            correo,
            contasena,
            rol,
            foto
        });

        const salt = bcrypt.genSaltSync(10);
        usuario.contasena = bcrypt.hashSync(usuario.contasena, salt);
        

        await usuario.save();

        res.status(201).json({
            msg: "PRUEBA NUEVO CONTROLLER",
            usuario
        });

    } catch (error) {
        res.status(500).json({
            msg: "Error al guardar usuario",
            error: error.message
        });
    }
};

const usuarioPut = async (req, res) => {
    const { id } = req.params;
    const {_id,contasena,correo,rol, ...resto} = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    });
};

const usuarioDelete = async (req, res) => {
    const { id } = req.params;
    

    const usuario = await Usuario.findByIdAndDelete(id);

    res.json({
        msg: 'Usuario eliminado correctamente',
        usuario
    });
};

const usuarioPatch = (req, res) => {
    const { id } = req.params;
    const datos = req.body;

    res.json({
        msg: "API - patch",
        id,
        datos
    });
};

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    usuarioPatch
};
