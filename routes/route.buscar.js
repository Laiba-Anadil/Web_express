const express = require("express");

const router = express.Router();
const { buscar } = require("../controllers/controller.buscar");



module.exports = router;

router.get("/:seccion/:concepto", buscar);