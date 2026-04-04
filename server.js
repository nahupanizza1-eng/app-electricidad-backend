import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente 🚀');
});

// Ruta para chat (todavía sin IA)
app.post('/api/chat', (req, res) => {
  const { mensaje } = req.body;

  res.json({
    respuesta: `Recibí tu mensaje: "${mensaje}"`
  });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});