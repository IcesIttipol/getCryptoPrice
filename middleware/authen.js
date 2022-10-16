const ev = require("express-validator");
const md5 = require("md5");

const token = async (req, res, next) => {
  try {
    
    let errors = ev.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        err: errors.mapped(),
      });
    }
    if (!req.headers || !req.headers.authorization) return res.status(403).send("No header Authorization");

    let auth = req.headers.authorization.split(':')

    if (auth[0] != "Token" || auth[1] === undefined) return res.status(403).send("Unauthorized (1) : Wrong authorization method");

    let time = req.params.time || req.body.time

    if (!time || isNaN(time)) return res.status(403).send("Unauthorized (2) : Invalid time");

    //if (auth[1] != md5(process.env.TOKEN_SALT + time)) return res.status(403).send("Unauthorized (2) : Invalid token hash");

    next()

  } catch (e) {
      return res.status(500).send("Authen Error!");
  };
};

module.exports = {token};
