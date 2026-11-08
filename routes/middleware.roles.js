const esAdminRole = (req, res, next) => {
    const {rol, nombre} = req.usuario;

    if (rol !== "ADMIN") {
        return res.status(401).json({
            msg: "esta operación solo puede ser realizada por un administrador"
        });
    }
    next();
}  

module.exports = { esAdminRole };