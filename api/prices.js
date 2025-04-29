export default async function handler(req, res) {
  try {
    const sheetID = "18koeqwdzJ612S8NT701NaM-Z_FwjfibqxWgXH21VuRU";
    const sheetName = "Prices";
    const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

    const response = await fetch(url);
    const text = await response.text();

    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows;

    const data = rows.map(row => ({
      produto: row.c[1]?.v || '',
      marca: row.c[2]?.v || '',
      preco: row.c[3]?.v || '',
      data: row.c[4]?.v || '',
      categoria: row.c[5]?.v || '',
      promocao: row.c[6]?.v || ''
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error("Erro na API:", error);
    res.status(500).json({ error: 'Erro ao buscar dados da planilha' });
  }
}
