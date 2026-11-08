const jwt = require('jsonwebtoken');

const generarJWT = (id="") => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, process.env.KEYPRIVATETOKEN, {
            expiresIn: "24h"
        }, (err, token) => {
            if (err) {
                console.error(err);
                reject("Error al generar el token");
            } else {
                resolve(token);
            }
        });
    });
}    

module.exports = generarJWT;