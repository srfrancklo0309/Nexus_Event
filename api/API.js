const BASEURL = "http://localhost:3000";

const HEADERS = { "Content-Type": "application/json" };

// Verifica si la respuesta HTTP es exitosa
const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error(`Ocurrio un error al procesar la petición.`);
  }
  return response;
}

// Obtiene datos del servidor
const getData = async (ENDPOINT) => {
  return fetch(`${BASEURL}/${ENDPOINT}`)
    .then(checkResponse)  
    .then(response => response.json());
};

// Crea nuevos datos en el servidor
const createData = async (ENDPOINT, data) => {
  return fetch(`${BASEURL}/${ENDPOINT}`, {
    ...HEADERS,
    method: 'POST',
    body: JSON.stringify(data)
  }).then(checkResponse)
    .then(response => response.json());
}

// Actualiza datos existentes en el servidor
const updateData = async (ENDPOINT, data, id) => {
  return fetch(`${BASEURL}/${ENDPOINT}/${id}`, {
    ...HEADERS,
    method: 'PUT',
    body: JSON.stringify(data)
  }).then(checkResponse)
    .then(response => response.json());
};

// Actualiza parcialmente datos en el servidor
const patchData = async (ENDPOINT, data, id) => {
  return fetch(`${BASEURL}/${ENDPOINT}/${id}`, {
    ...HEADERS,
    method: 'PATCH',
    body: JSON.stringify(data)
  }).then(checkResponse)
    .then(response => response.json());
};

// Elimina datos del servidor
const deleteData = async (ENDPOINT, id) => {
  return fetch(`${BASEURL}/${ENDPOINT}/${id}`, {
    method: 'DELETE',
  }).then(checkResponse)
    .then(response => response.json());
};

export { 
  getData,
  createData,
  updateData,
  patchData,
  deleteData
}