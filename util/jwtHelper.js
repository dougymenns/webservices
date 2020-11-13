verified = jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
      const errMessage = err.message;
      return {
        errMessage,
        success: false,
      };
    } else {
      next();
      return {
        success: true,
        data: decoded,
      };
    }
  });