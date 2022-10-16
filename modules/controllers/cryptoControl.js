const CoinGecko = require('coingecko-api')
const CoinGeckoClient = new CoinGecko();

exports.getCryptoPrice = async (req, res, next) => {
  try {
    let {
      symbol,
      target
    } = req.body
    let data = await CoinGeckoClient.coins.all()
    if (!data?.code) {
      return res.status(404).json({
        status: 500,
        data: "cannot get coins"
      })
    }
    let checkCoin = data.data.filter(a => symbol.includes(a.symbol.toUpperCase()))
    if (checkCoin.length == 0) {
      return res.status(404).json({
        status: 404,
        data: "not found symbol"
      })
    }
    let response = [];
    for (let coin of checkCoin) {
      data = await CoinGeckoClient.coins.fetch(coin.id)
      let _coinList = {};
      let _datacc = data.data.tickers.filter(t => t.target == target);
      if(_datacc.length == 0) throw "not found target"
      symbol.forEach((i) => {
        let _temp = _datacc.filter(t => t.base == i.toUpperCase());
        let _res = _temp.length == 0 ? [] : _temp[0];
        _coinList[`${i.toUpperCase()}${_res.target}`] = _res.last;
      })
      response.push(_coinList)
    }
    return res.status(200).json({
      status: 200,
      data: response
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      err: typeof err.stack != "undefined" ? err.stack : err,
    })
  }
};