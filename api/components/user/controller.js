import { nanoid } from "nanoid";
import auth from "../auth/index.js"
const TABLA = "user";

export default function controller (injectedStore)  {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy.js").default;
  }
  const list = () => {
    return store.list(TABLA);
  };
  const get = (id) => {
    return store.get(TABLA, id);
  };
  const upsert = async (body) => {
    const user = {
      name: body.name,
      username: body.username,
      password: body.password
    };
    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    if(body.password || body.username){
        await auth.upsert({
            id: user.id,
            username: user.username,
            password: user.password,
        })
    }
    return store.upsert(TABLA, user);
  };

  return {
    list,
    get,
    upsert
  };
};
