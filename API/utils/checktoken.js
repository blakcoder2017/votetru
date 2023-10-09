exports.checkToken = (req, res) => {
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization;
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      status: 'Failed',
      message: 'You are not logged in, Please log in to get access',
    });
  }

  return token;
};
exports.newToken = (req, res) => {
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization;
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      status: 'Failed',
      message: 'You are not logged in, Please log in to get access',
    });
  }

  return token;
};
