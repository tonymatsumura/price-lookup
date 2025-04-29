import fetch from "node-fetch";

export default async function handler(req, res) {
  const sheetID = "18koeqwdzJ612S8NT701NaM-Z_FwjfibqxWgXH21VuRU";
  const sheetName = "Prices";
  const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows;

    const data = rows.map(row => ({
      produto: row.c[0]?.v || "",
      marca: row.c[1]?.v || "",
      preco: row.c[2]?.v || "",
      data: row.c[3]?.v || "",
      categoria: row.c[4]?.v || "",
      promocao: row.c[5]?.v || "",
    }));

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
}
