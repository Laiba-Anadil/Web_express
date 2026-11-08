
const express = require("express");
const path = require("path");
const rutasBuscar = require("../routes/route.buscar");
const rutaAuth = require("../routes/route.auth");
const { dbConnection } = require("../db/config.db");

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 3000;

        this.middleware();
        this.routes();
    }

    middleware() {
        this.app.use(express.json());
        this.app.use(express.static("public"));
    }

    routes() {

        this.app.use("/api/auth", rutaAuth);

        this.app.use(
            "/api/buscar",
            rutasBuscar
        );

        this.app.use(
            "/api/usuarios",
            require("../routes/route.usuario")
        );

        this.app.get("/", (req, res) => {
            res.sendFile(path.resolve("public/index.html"));
        });

        this.app.get("/contacto", (req, res) => {
            res.sendFile(path.resolve("public/contacto.html"));
        });

        this.app.get("/localizacion", (req, res) => {
            res.sendFile(path.resolve("public/localizacion.html"));
        });

        this.app.use((req, res) => {
            res.status(404).sendFile(path.resolve("public/404.html"));
        });
    }

    async listen() {
        try {
            await dbConnection();

            this.app.listen(this.PORT, () => {
                console.log(
                    `Servidor escuchando en http://localhost:${this.PORT}`
                );
            });

        } catch (error) {
            console.error("Error al iniciar el servidor:", error);
            process.exit(1);
        }
    }
}

module.exports = Server;
