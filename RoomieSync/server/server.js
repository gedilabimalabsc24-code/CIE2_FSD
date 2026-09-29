const express = require('express');
const cors = require('cors');
const roommateRoutes = require('./routes/roommateRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());                    // Allow requests from React dev server
app.use(express.json());            // Parse JSON request bodies

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/roommates', roommateRoutes);

// Root health-check
app.get('/', (req, res) => {
  res.json({ message: 'RoomieSync API is running 🚀' });
});

// ── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ RoomieSync server running at http://localhost:${PORT}`);
});
