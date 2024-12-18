// Import necessary modules
const express = require("express");
const dns = require("dns").promises;
const { promisify } = require("util");

// Promisify dns.lookup to use async/await

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

/**
 * POST /resolve
 * Request Body: {
 *   "domain": "example.com",
 *   "dnsServers": ["8.8.8.8", "8.8.4.4"] (optional)
 * }
 * Response: { "domain": "example.com", "addresses": ["93.184.216.34"] }
 */
const typeMapping = {
  Viettel: [`203.113.131.1`],
};
app.get("/resolve", async (req, res) => {
  const { domain, type } = req.query;

  if (!domain) {
    return res.status(400).json({ error: "Domain is required" });
  }
  if (!type) {
    return res.status(400).json({ error: "Type is required" });
  }
  const dnsServers = typeMapping?.[type] || undefined;
  if (!dnsServers) {
    return res.status(400).json({ error: "No matching type" });
  }
  try {
    // Create a custom resolver if DNS servers are provided
    const resolver = new dns.Resolver();
    if (dnsServers && Array.isArray(dnsServers)) {
      resolver.setServers(dnsServers);
    }

    // Resolve the domain using the custom resolver
    const addresses = await resolver.resolve(domain);

    res.json({ domain, addresses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
