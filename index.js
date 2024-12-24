const express = require("express");
const dns = require("dns").promises;
const app = express();
const port = process.env.PORT || 33908;

app.use(express.json());

const typeMapping = {
  Viettel: ["203.113.131.1"],
  VNPT: ["123.30.215.27"],
};

// Disclaimer message
const DISCLAIMER =
  "By using this service, you agree that input domains must be legitimate and compliant with applicable laws. We are not responsible for misuse or inaccurate results. For more further infomation, read at /tos";

// Endpoint to resolve domain
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
    const resolver = new dns.Resolver();
    if (dnsServers && Array.isArray(dnsServers)) {
      resolver.setServers(dnsServers);
    }

    const addresses = await resolver.resolve(domain);
    res.json({ domain, addresses, disclaimer: DISCLAIMER });
  } catch (error) {
    res.status(500).json({ error: error.message, disclaimer: DISCLAIMER });
  }
});

// Endpoint for Terms of Service
app.get("/tos", (req, res) => {
  res.json({
    tos: "Terms of Service",
    content:
      "This service is provided as-is for informational purposes only. Users must ensure compliance with applicable laws and regulations. Misuse of this service, including testing illegitimate or malicious domains, is strictly prohibited. The provider is not liable for any issues arising from the use of this service",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
