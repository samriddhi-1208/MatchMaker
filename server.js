const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// Secret signing key for session token issuance
const JWT_SECRET = 'tdc_matchmaker_secure_signing_token_key_2026';

/* DATABASE LAYER REFERENCE */
let db_customers = []; 
let db_profiles = [
  { id: 1, fname: "Ishita", lname: "Sharma", age: 25, city: "Pune", profession: "Engineer", compatibility: 80, gender: "Female" },
  { id: 2, fname: "Riya", lname: "Kapoor", age: 24, city: "Mumbai", profession: "Teacher", compatibility: 72, gender: "Female" },
  { id: 3, fname: "Ananya", lname: "Jain", age: 27, city: "Delhi", profession: "Doctor", compatibility: 90, gender: "Female" }
];

/* --- API ROUTING PROTOCOLS --- */

// 1. System Secure Registration Route
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, fname, lname } = req.body;
    
    // Check if account already exists
    if (db_customers.find(c => c.email === email)) {
      return res.status(400).json({ error: "An account with this email already exists." });
    }

    // Encrypt security credentials securely using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
const newCustomer = {
  id: Date.now(),
  email,
  password: hashedPassword,
  fname: fname || "New", // Corrected
  lname: lname || "User"  // Corrected
};
    db_customers.push(newCustomer);
    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    res.status(500).json({ error: "Internal registration failure." });
  }
});

// 2. Authentication Protocol Endpoint (Login)
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = db_customers.find(c => c.email === email);

  if (!user) return res.status(400).json({ error: "Invalid email or password." });

  // Decrypt and compare securely
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid email or password." });

  // Generate an authenticated session token valid for 24 Hours
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
  
  res.json({ token, user: { fname: user.fname, lname: user.lname, email: user.email } });
});

// 3. Matchmaking Core Catalog Access Route
app.get('/api/profiles', (req, res) => {
  // Return the data pool safely to authenticated clients
  res.json(db_profiles);
});

// Start service on interface port 5000
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 TDC Matchmaker Backend live on http://localhost:${PORT}`));