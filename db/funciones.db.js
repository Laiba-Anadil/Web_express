const Usuario = require('../modules/model.usuario');

const existeCorreoDB = async correo => {
    const usuario = await Usuario.findOne({ correo });
    if (usuario) {
      throw new Error(`El correo ${correo} ya está registrado`);
    }
};

const existeIdDB = async id => {
    const usuario = await Usuario.findById({ _id: id });
    if (usuario) {
      throw new Error(`El ID ${id} ya está registrado`);
    }
};

const existeIdDBDel = async id => {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
        throw new Error(`El ID ${id} no existe`);
    }
};


module.exports = { existeCorreoDB, existeIdDB, existeIdDBDel };