import { getData, createData } from "./API.js";

const ENDPOINT = "contacts";

const getContacts = async () => {
  try {
    const contacts = await getData(ENDPOINT);
    return { status: true, data: contacts };
  } catch (error) {
    return { status: false, message: error };
  }
};

const newContact = async (contact) => {
  try {
    await createData(ENDPOINT, contact);
    return { status: true, message: "Contacto creado exitosamente" };
  } catch (error) {
    return { status: false, message: error };
  }
};

export {
  getContacts,
  newContact
}