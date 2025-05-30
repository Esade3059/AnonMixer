import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for your Netlify frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Your Netlify URL will go here
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Get contract address
app.get('/api/contract', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) throw error;

    if (data && data.length > 0) {
      res.json({ contract_address: data[0].contract_address });
    } else {
      res.json({ contract_address: null });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
}); 