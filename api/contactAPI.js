import { getData } from "./API.js";

const ENDPOINT = "contacts";

const getContacts = async () => {
  try {
    const contacts = await getData(ENDPOINT);
    return { status: true, data: contacts };
  } catch (error) {
    return { status: false, message: error };
  }
}

export {
  getContacts
}