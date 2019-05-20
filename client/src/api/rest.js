import axios from "axios";

const service = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000/api",
  withCredentials: true
});

const errHandler = err => {
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,

  get(catalog, _id = undefined) {
    return service
      .get(_id ? `/${catalog}?_project=${_id}` : `/${catalog}`)
      .then(res => res.data)
      .catch(errHandler);
  },

  put(catalog, id, body) {
    return service
      .put(`/${catalog}/${id}`, body)
      .then(res => res.data)
      .catch(errHandler);
  },

  post(catalog, body) {
    return service
      .post(`/${catalog}`, body)
      .then(res => res.data)
      .catch(errHandler);
  },

  delete(catalog, id) {
    return service
      .delete(`/${catalog}/${id}`)
      .then(res => res.data)
      .catch(errHandler);
  },

  getSingle(catalog, id) {
    return service
      .get(`/${catalog}/${id}`)
      .then(res => res.data)
      .catch(errHandler);
  }
};
