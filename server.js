const PORT = 8080;
const homepage = 'home.html';

const express = require('express');
const os = require('os');
const path = require('path');
const fs = require('fs');

const app = express();
const http = require('http').createServer(app);

// Middleware para parsear JSON
app.use(express.json());

const publicPath = path.resolve(__dirname);
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, homepage));
});

// Endpoint para guardar resultados
app.post('/api/guardar-resultado', (req, res) => {
  try {
    const resultado = req.body;
    const filePath = path.join(__dirname, 'data', 'resultados.json');

    // Leer archivo existente
    let resultados = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      resultados = JSON.parse(data);
    }

    // Buscar si ya existe un resultado para este ejercicio
    const existingIndex = resultados.findIndex(r =>
      r.pagina === resultado.pagina &&
      r.capitulo === resultado.capitulo &&
      r.nombreEjercicio === resultado.nombreEjercicio
    );

    let action = 'guardado';

    if (existingIndex !== -1) {
      // Si existe, comparar puntajes
      const existingScore = resultados[existingIndex].puntaje;
      const newScore = resultado.puntaje;

      if (newScore > existingScore) {
        // Reemplazar con el mejor resultado
        resultados[existingIndex] = resultado;
        action = 'actualizado (mejor puntaje)';
        console.log(`Resultado actualizado: ${newScore} > ${existingScore}`);
      } else {
        // No guardar, el anterior es mejor
        action = 'no guardado (puntaje menor o igual)';
        console.log(`Resultado no guardado: ${newScore} <= ${existingScore}`);
      }
    } else {
      // No existe, agregar nuevo resultado
      resultados.push(resultado);
      action = 'guardado (nuevo)';
    }

    // Guardar archivo con formato bonito
    fs.writeFileSync(filePath, JSON.stringify(resultados, null, 2), 'utf8');

    console.log('Resultado ' + action + ':', resultado);
    res.json({
      success: true,
      message: 'Resultado ' + action,
      action: action,
      total: resultados.length
    });

  } catch (error) {
    console.error('Error al guardar resultado:', error);
    res.status(500).json({
      success: false,
      message: 'Error al guardar el resultado',
      error: error.message
    });
  }
});

http.listen(PORT, () => {
  console.log("server.js active");

  const networkInterfaces = os.networkInterfaces();
  let IP_private_ETH;
  let IP_private_WiFi;

  if (networkInterfaces['Ethernet']) {
    IP_private_ETH = networkInterfaces['Ethernet'][0].address;
    console.log("IP_private_ETH : " + IP_private_ETH);
  }

  switch (os.platform()) {
    case "win32":
      if (networkInterfaces['Wi-Fi']) {
        IP_private_WiFi = networkInterfaces['Wi-Fi'][0].address; // Home Wifi Windows
      }
      break;
    case "darwin":
      if (networkInterfaces['en0']) {
        IP_private_WiFi = networkInterfaces['en0'][0].address; // Home Wifi macOS
      }
      break;
    default:
      console.log("I don't know the system operative. :/ ");
      IP_private_WiFi = "ni idea";
  }

  console.log("IP_private_WiFi : " + IP_private_WiFi);
  console.log("PORT : " + PORT);
  console.log('The server is working on http://localhost:' + PORT);
});
