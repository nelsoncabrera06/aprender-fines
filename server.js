const PORT = 8080;
const homepage = 'home.html';

const express = require('express');
const os = require('os');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const publicPath = path.resolve(__dirname);
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, homepage));
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
