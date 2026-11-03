const express = require('express');

const app = express();

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Ruta para la página de contacto
app.get('/contacto', (req, res) => {
    res.sendFile(__dirname + '/public/contacto.html');
});

// Ruta para la página de localización
app.get('/localizacion', (req, res) => {
    res.sendFile(__dirname + '/public/localizacion.html');
});

// Ruta para la página 404
app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/public/404.html');
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log(`Servidor escuchando en http://localhost:3000`);
});