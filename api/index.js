const axios = require("axios");

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = (req, res) => {
  const { limit } = req.query;
  let url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=${limit}`;

  axios
    .get(url, { headers: { "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY } })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err.response.data);
      res.send(err.response.data);
    });
};

module.exports = allowCors(handler);
