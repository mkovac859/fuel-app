export async function handler() {
  try {
    const url =
      "https://data.statistics.sk/api/v2/datasource/STATDAT/sp0207ts";

    const res = await fetch(url);
    const data = await res.json();

    // JSON-stat parsing
    const values = data.value;
    const dims = data.dimension;

    const gasolineIndex =
      dims.INDICATOR.category.index["Benzín 95 (eur / l)"];
    const dieselIndex =
      dims.INDICATOR.category.index["Motorová nafta (eur / l)"];

    const gasoline95 = values[gasolineIndex];
    const diesel = values[dieselIndex];

    return {
      statusCode: 200,
      body: JSON.stringify({
        gasoline95,
        diesel,
        updated: new Date().toISOString(),
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to load fuel data" }),
    };
  }
}