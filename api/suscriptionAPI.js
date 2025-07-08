import { getData, createData, deleteData } from "./API.js";

const ENDPOINT = "suscriptions";

const getSuscriptions = async () => {
  try {
    const suscriptions = await getData(ENDPOINT);
    return { status: true, data: suscriptions };
  } catch (error) {
    return { status: false, message: error };
  }
}

const newSuscription = async (suscription) => {
  try {
    const { data: suscriptions } = await getSuscriptions();
    const suscriptionExist = suscriptions.some(dbSuscription => suscription.id === dbSuscription.id);

    if (suscriptionExist) {
      throw new Error("Ya existe una suscripción con este ID");
    }
    await createData(ENDPOINT, suscription);

    return { status: true, message: "Suscripción exitosa" };
  } catch (error) {
    return { status: false, message: error };
  }
}

const deleteSuscriptions = async (id) => {
  try {
    const suscriptions = await deleteData(ENDPOINT, id);
    return { status: true, data: suscriptions };
  } catch (error) {
    return { status: false, message: error };
  }
}

export {
  getSuscriptions,
  newSuscription,
  deleteSuscriptions
}