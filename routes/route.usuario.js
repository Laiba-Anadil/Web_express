
const express = require("express");
const { validarJWT } = require("./middleware.jwt");
const { esAdminRole } = require("./middleware.roles");

const {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    usuarioPatch
} = require("../controllers/controller.usuario");

const { check } = require('express-validator');

const middlewareValidar = require('./middleware.validar');

const { existeCorreoDB, existeIdDB, existeIdDBDel } = require('../db/funciones.db');

const router = express.Router();

router.get("/", usuarioGet);

router.post("/", [
    check('nombre').not().isEmpty().withMessage('El nombre es obligatorio'),
    check('correo').isEmail().withMessage('debe ser un correo válido'),
    check('correo').custom(existeCorreoDB),
], middlewareValidar,
 usuarioPost);

router.put("/:id", [
    check('id').custom(existeIdDB),
], middlewareValidar, usuarioPut);

router.delete("/:id", validarJWT, esAdminRole, [
    check('id').custom(existeIdDBDel),
], middlewareValidar, usuarioDelete);

router.patch("/:id", usuarioPatch);

module.exports = router;
