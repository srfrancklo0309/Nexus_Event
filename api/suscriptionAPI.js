import { getData } from "./API.js";

const ENDPOINT = "suscriptions";

const getSuscriptions = async () => {
  try {
    const suscriptions = await getData(ENDPOINT);
    return { status: true, data: suscriptions };
  } catch (error) {
    return { status: false, message: error };
  }
}

export {
  getSuscriptions
}