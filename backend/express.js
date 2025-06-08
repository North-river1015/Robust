import axios from "axios";

export default async function handler(req, res) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Enter a query" });

  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  const GOOGLE_CSE_ID = process.env.GOOGLE_CSE_ID;
  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}&q=${encodeURIComponent(q)}`;

  try {
    const { data } = await axios.get(apiUrl);
    res.json({ results: data.items || [] });
  } catch (e) {
    res.status(500).json({ error: "Search failed", details: e.message });
  }
}