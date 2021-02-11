//import jsonwebtoken library 
const jwt = require("jsonwebtoken");

//export module as a middleware
exports.authUser = async (header) => {
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
