const fsp = require("fs").promises;
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");
const logger = (req, res, next) => {
  if (fs.existsSync(path.join(__dirname, "serverLogs.txt"))) {
  } else {
    fs.writeFile(path.join(__dirname, "serverLogs.txt"), "", (err) => {
      if (err) {
        throw err;
      }
      console.log("serverLogs file was created");
    });
  }
  const date = new Date().toGMTString();
  let user;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const findUserFromToken = async () => {
      try {
        next();
        let token = req.headers.authorization.split(" ")[1];
        user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const msg = `Date :${date}, Method: ${req.method},Origin: ${
          req.originalUrl
        }, ${res.statusCode},Content-Length: ${
          res.get("Content-Length") || 0
        }b sent ,${user && `user :${user.id}`} , ${
          user && `Role :${user.role}`
        }, \n`;
        fsp.appendFile(
          path.join(__dirname, "../", "serverLogs.txt"),
          msg,
          (err) => {
            if (err) {
              throw err;
            }
          }
        );
      } catch {
        next();
        const msg = `Date :${date}, Method: ${req.method},Origin: ${
          req.originalUrl
        }, ${res.statusCode},Content-Length: ${
          res.get("Content-Length") || 0
        }b sent \n`;
        fsp.appendFile(
          path.join(__dirname, "../", "serverLogs.txt"),
          msg,
          (err) => {
            if (err) {
              throw err;
            }
          }
        );
      }
    };
    findUserFromToken();
  } else {
    next();
    const msg = `Date :${date}, Method: ${req.method},Origin: ${
      req.originalUrl
    }, ${res.statusCode},Content-Length: ${
      res.get("Content-Length") || 0
    }b sent \n`;
    fsp.appendFile(
      path.join(__dirname, "../", "serverLogs.txt"),
      msg,
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  }
};
module.exports = logger;
