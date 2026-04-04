const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Ruta IA REAL
app.post('/api/chat', async (req, res) => {
  const { mensaje } = req.body;

  if (!mensaje) {
    return res.json({ respuesta: 'No enviaste ningún mensaje.' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Sos un electricista profesional experto en normativa AEA Argentina. Respondé claro, técnico y práctico."
          },
          {
            role: "user",
            content: mensaje
          }
        ]
      })
    });

    const data = await response.json();

    const respuesta = data.choices?.[0]?.message?.content || "No pude responder.";

    res.json({ respuesta });

  } catch (error) {
    console.error(error);
    res.json({ respuesta: "Error al conectar con la IA." });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto ' + PORT);
});