var jwt = require("jsonwebtoken");

module.exports = {
  verifyJWT(req, res, next) {
    var token = req.headers.authorization.split(" ")[1];
    if (!token)
      return res.status(401).json({
        auth: false,
        message: "Você precisa de um token válido para acessar esse endpoint.",
      });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err)
        return res.status(500).json({
          auth: false,
          message: "Ocorreu uma falha na autenticação do token.",
        });

      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.userId;
      req.email = decoded.email;
      req.name = decoded.name;

      next();
    });
  },
};
