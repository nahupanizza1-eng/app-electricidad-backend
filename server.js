const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Ruta IA
app.post('/api/chat', async (req, res) => {
  const { mensaje } = req.body;

  if (!mensaje) {
    return res.json({ respuesta: 'No enviaste ningún mensaje.' });
  }

  // Simulación de IA (podemos mejorar esto después)
  const respuesta = `Respuesta IA: "${mensaje}"`;

  res.json({ respuesta });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto ' + PORT);
});