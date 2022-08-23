import jwt from "jsonwebtoken";
import config from "../config.js";
const secret = config.jwt.secret;
const sign = (data) => {
  return jwt.sign(data, "secreto");
};
const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req);
    console.log(decoded);
    if(decoded.id!==owner){
        throw new Error('No puedes hacer update')
    }
  },
};
const verify = (token) => {
  return jwt.verify(token, secret);
};

const getTocken = (auth) => {
  if (!auth) {
    throw new Error("No viene token");
  }
  if (auth.indexOf("Bearer ") === -1) {
    throw new Error("Formato del token invalido");
  }
  let token = auth.replace("Bearer ", "");
  return token;
};

const decodeHeader = (req) => {
  const authorization = req.headers.authorization;
  const token = getTocken(authorization);
  const decoded = verify(token);
  req.user = decoded;
  return decoded;
};
export default { sign, check};
