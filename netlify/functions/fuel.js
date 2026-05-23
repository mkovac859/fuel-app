exports.handler = async () => {
  const url =
    "https://data.statistics.sk/api/v2/datasource/STATDAT/sp0207ts";

  try {
    const res = await fetch(url);

    const status = res.status;
    const rawText = await res.text();

    let data = null;
    let parseError = null;

    try {
      data = JSON.parse(rawText);
    } catch (err) {
      parseError = err.message;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        debug: true,
        apiStatus: status,
        parseError,
        raw: rawText,
        parsed: data,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        debug: true,
        error: err.message,
      }),
    };
  }
};
