const BASEURL = "http://localhost:3000";

const HEADERS = { "Content-Type": "application/json" };

const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error(`Ocurrio un error al procesar la petición.`);
  }
  return response;
}

const getData = async (ENDPOINT) => {
  return fetch(`${BASEURL}/${ENDPOINT}`)
    .then(checkResponse)
    .then(response => response.json());
};

const createData = async (ENDPOINT, data) => {
  return fetch(`${BASEURL}/${ENDPOINT}`, {
    ...HEADERS,
    method: 'POST',
    body: JSON.stringify(data)
  }).then(checkResponse)
    .then(response => response.json());
}

const updateData = async (ENDPOINT, data) => {
  return fetch(`${BASEURL}/${ENDPOINT}`, {
    ...HEADERS,
    method: 'PUT',
    body: JSON.stringify(data)
  }).then(checkResponse)
    .then(response => response.json());
};

const patchData = async (ENDPOINT, data) => {
  return fetch(`${BASEURL}/${ENDPOINT}`, {
    ...HEADERS,
    method: 'PATCH',
    body: JSON.stringify(data)
  }).then(checkResponse)
    .then(response => response.json());
};

const deleteData = async (ENDPOINT, data) => {
  return fetch(`${BASEURL}/${ENDPOINT}`, {
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