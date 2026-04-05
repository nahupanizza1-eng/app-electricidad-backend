const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));
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

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    input: `Sos un electricista profesional experto en normativa AEA Argentina. Respondé claro, técnico y práctico.\n\nConsulta: ${mensaje}`
  })
});

const text = await response.text();
console.log("RESPUESTA OPENAI:", text);

if (!response.ok) {
  return res.json({ respuesta: "Error de OpenAI: " + text });
}

let data;

try {
  data = JSON.parse(text);
} catch (e) {
  return res.json({ respuesta: "Error al interpretar respuesta de IA." });
}

const respuesta = data.output?.[0]?.content?.[0]?.text || "No pude responder.";

return res.json({ respuesta });

  } catch (error) {
    console.error(error);
    return res.json({ respuesta: "Error al conectar con la IA." });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto ' + PORT);
});