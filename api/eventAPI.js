import { getData, createData, updateData, deleteData } from "./API.js";

const ENDPOINT = "events";

const getEvents = async () => {
  try {
    const events = await getData(ENDPOINT);

    return { status: true, data: events };
  } catch (error) {
    return { status: false, message: error };
  }
}

const newEvent = async (event) => {
  try {
    const { data: events } = await getEvents();
    const eventExists = events.some(dbEvent => event.id === dbEvent.id);

    if (eventExists) {
      throw new Error("Ya existe un evento con este ID");
    }
    await createData(ENDPOINT, event);

    return { status: true, message: "Evento creado exitosamente" };
  } catch (error) {
    return { status: false, message: error };
  }
}

const updateEvent = async (event) => {
  try {
    await updateData(ENDPOINT, event, event.id);
    return { status: true, message: "Evento actualizado exitosamente" };
  } catch (error) {
    return { status: false, message: error };
  }
}

const deleteEvent = async (id) => {
  try {
    await deleteData(ENDPOINT, id);
    return { status: true, message: "Evento eliminado exitosamente" };
  } catch (error) {
    return { status: false, message: error };
  }
}

export {
  getEvents,
  newEvent,
  updateEvent,
  deleteEvent
}