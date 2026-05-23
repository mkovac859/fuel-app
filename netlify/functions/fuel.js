const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.handler = async () => {
  try {
    const url =
      "https://data.statistics.sk/api/v2/datasource/STATDAT/sp0207ts";

    const res = await fetch(url);

    // 🔥 DEBUG 1: status API
    console.log("STATUS:", res.status);

    const rawText = await res.text();

    // 🔥 DEBUG 2: čo API reálne posiela
    console.log("RAW RESPONSE:", rawText);

    return {
      statusCode: 200,
      body: JSON.stringify({
        debug: true,
        status: res.status,
        raw: rawText,
      }),
    };

  } catch (err) {
    console.log("ERROR:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};
