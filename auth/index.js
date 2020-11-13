const jwt = require("jsonwebtoken");

exports.authUser = async (header) => {
  //   const authHeader = await req.get("Authorization");
  console.log("auth header", await header);
  const token = header.split(" ")[1];
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log(err)
        reject({ success: false, err });
      } else { 
        resolve({ success: true, decoded });
      }
    });
  });
};
