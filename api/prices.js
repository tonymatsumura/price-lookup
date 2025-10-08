export default async function handler(req, res) {
  try {
    //const sheetID = "18koeqwdzJ612S8NT701NaM-Z_FwjfibqxWgXH21VuRU";
    const sheetID = "1S_ZnkoVT7W9kFAafS1ApH4AlRsuqVwLi3yAKdpWD-Qg";
    //const sheetName = "Prices";
    //Spreadsheet  XURL = "https://docs.google.com/spreadsheets/d/1S_ZnkoVT7W9kFAafS1ApH4AlRsuqVwLi3yAKdpWD-Qg"
    const sheetName = "Products";
    const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

    const response = await fetch(url);
    const text = await response.text();
    console.log("text:", text);

    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows;
    console.log(rows);

    const data = rows.map(row => ({
      produto: row.c[0]?.v || "",
      preco: row.c[1]?.v || "",
      thumbnail: row.c[2]?.v || "",
      data: row.c[3]?.v || "",
      supermarket: row.c[4]?.v || "",
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error("Erro na API:", error);
    res.status(500).json({ error: "Erro ao buscar dados da planilha" });
  }
}
