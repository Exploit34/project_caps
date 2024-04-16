
// const express = require('express');
// const app = express();

// // Definir middleware personalizado
// app.use(express.json());

// // Definir una ruta personalizada
// app.get('/api/custom', (req, res) => {
//   res.send('Respuesta desde un endpoint personalizado');
// });

// // Iniciar el servidor
// const port = 6000;
// app.listen(port, () => {
//   console.log(`Servidor custom escuchando en el puerto ${port}`);
// });


// const express = require('express');
// const app = express();

// // Configurar CORS
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // Permitir cualquier origen
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
//     res.header('Access-Control-Allow-Headers', 'Content-Type'); // Encabezados permitidos
//     next();
// });

// // Agregar el servicio CAP existente
// const cds = require('@sap/cds');
// cds.on('bootstrap', (app) => {
//     app.use('/', express.static(__dirname + '/app')); // Servir archivos estáticos
// });

// // Delegar al servidor predeterminado de CAP
// module.exports = cds.server;
