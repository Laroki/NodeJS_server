/* Imports */
const axios = require('axios');
const csv = require("csvtojson");
const express = require('express');
const apiRouter = express.Router();

let config = {
  headers: {
    "Authorization": `Token ${process.env.TOKEN}`,
    "Content-Type": "application/vnd.flux"
  }
}

/* Configuration */
class ApiRouterClass {
  constructor() { };

  getPostData(start, measurement, nodeId) {
    return `from(bucket:"mqtthetic")
    |> range(start:${start})
    |> filter(fn: (r) => r["_measurement"] == "${measurement}")
    |> filter(fn: (r) => r["_field"] == "data_value")
    |> filter(fn: (r) => r["nodeID"] == "${nodeId}")`
  };

  routes() {
    apiRouter.get(`/temperature`, (req, res) => {
      axios.post(process.env.URL, this.getPostData('-1h', 'Temperature', 'global'), config)
        .then(response => {
          csv().fromString(response.data)
            .then((data) => res.json({
              data: data.map(x => ({ time: x._time, value: x._value })),
              unit: '°C'
            }))
        })
        .catch(error => res.json(error));
    });

    apiRouter.get(`/luminosity`, (req, res) => {
      axios.post(process.env.URL, this.getPostData('-1h', 'Luminosite', 'global'), config)
        .then(response => {
          csv().fromString(response.data)
            .then((data) => res.json({
              data: data.map(x => ({ time: x._time, value: x._value })),
              unit: 'lux'
            }))
        })
        .catch(error => res.json(error));
    });

    apiRouter.get(`/humidity/air`, (req, res) => {
      axios.post(process.env.URL, this.getPostData('-1h', 'Humidite', 'global'), config)
        .then(response => {
          csv().fromString(response.data)
            .then((data) => res.json({
              data: data.map(x => ({ time: x._time, value: x._value })),
              unit: '%'
            }))
        })
        .catch(error => res.json(error));
    });

    apiRouter.get(`/humidity/basilic`, (req, res) => {
      axios.post(process.env.URL, this.getPostData('-1h', 'Humidite', 'basilic'), config)
        .then(response => {
          csv().fromString(response.data)
            .then((data) => res.json({
              data: data.map(x => ({ time: x._time, value: x._value })),
              unit: '%'
            }))
        })
        .catch(error => res.json(error));
    });

    apiRouter.get(`/humidity/menthe`, (req, res) => {
      axios.post(process.env.URL, this.getPostData('-1h', 'Humidite', 'menthe'), config)
        .then(response => {
          csv().fromString(response.data)
            .then((data) => res.json({
              data: data.map(x => ({ time: x._time, value: x._value })),
              unit: '%'
            }))
        })
        .catch(error => res.json(error));
    });

    apiRouter.get(`/humidity/poivron`, (req, res) => {
      axios.post(process.env.URL, this.getPostData('-1h', 'Humidite', 'poivron'), config)
        .then(response => {
          csv().fromString(response.data)
            .then((data) => res.json({
              data: data.map(x => ({ time: x._time, value: x._value })),
              unit: '%'
            }))
        })
        .catch(error => res.json(error));
    });

    apiRouter.get(`/humidity/tomate`, (req, res) => {
      axios.post(process.env.URL, this.getPostData('-1h', 'Humidite', 'tomate'), config)
        .then(response => {
          csv().fromString(response.data)
            .then((data) => res.json({
              data: data.map(x => ({ time: x._time, value: x._value })),
              unit: '%'
            }))
        })
        .catch(error => res.json(error));
    });
  };


  init() {
    this.routes();
    return apiRouter;
  };
}

/* Export */
module.exports = {
  ApiRouterClass
};