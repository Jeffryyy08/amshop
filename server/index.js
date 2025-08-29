const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

app.get('/api/productos', async (req, res) => {
  try {
    const response = await axios.get(`${SUPABASE_URL}/rest/v1/productos`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      params: {
        select: '*'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar productos' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor backend en http://localhost:${PORT}`);
});