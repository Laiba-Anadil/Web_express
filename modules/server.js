const express = require("express");
const path = require("path");

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 3000;
    this.middleware();
    this.routes();
  }

  middleware() {
    // Middleware para servir archivos estáticos desde la carpeta "public"
    this.app.use(express.static("public"));
  }

  routes() {
    // Ruta para la página principal
    this.app.get("/", (req, res) => {
      res.sendFile(path.resolve('public/index.html'));
    });

    // Ruta para la página de contacto
    this.app.get("/contacto", (req, res) => {
      res.sendFile(path.resolve('public/contacto.html'));
    });

    // Ruta para la página de localización
    this.app.get("/localizacion", (req, res) => {
      res.sendFile(path.resolve('public/localizacion.html'));
    });

    // Ruta para la página 404
    this.app.use((req, res) => {
      res.status(404).sendFile(path.resolve('public/404.html'));
    });
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${this.PORT}`);
    }); 
  }  

}

module.exports = Server;
