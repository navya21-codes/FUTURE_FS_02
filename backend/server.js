const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", require("./routes/products"));

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend server is working!" });
});

// Home route
app.get("/", (req, res) => {
  res.json({ 
    message: "E-commerce Backend API is running!",
    endpoints: {
      test: "/api/test",
      products: "/api/products"
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  console.log("Local: http://localhost:" + PORT);
  console.log("Products API: http://localhost:" + PORT + "/api/products");
});
