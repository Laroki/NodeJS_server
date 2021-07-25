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

let globalTempPost = `from(bucket:"mqtthetic")
|> range(start:-1h)
|> filter(fn: (r) => r["_measurement"] == "Temperature")
|> filter(fn: (r) => r["_field"] == "data_value")
|> filter(fn: (r) => r["nodeID"] == "global")`;

let globalLumPost = `from(bucket:"mqtthetic")
  |> range(start:-1h)
  |> filter(fn: (r) => r["_measurement"] == "Luminosite")
  |> filter(fn: (r) => r["_field"] == "data_value")
  |> filter(fn: (r) => r["nodeID"] == "global")`

let globalHumPost = `from(bucket:"mqtthetic")
  |> range(start:-1h)
  |> filter(fn: (r) => r["_measurement"] == "Humidite")
  |> filter(fn: (r) => r["_field"] == "data_value")
  |> filter(fn: (r) => r["nodeID"] == "global")`

/* Configuration */
class ApiRouterClass {
  constructor() { };
  routes() {
    apiRouter.get(`/temperature`, (req, res) => {
      axios.post(process.env.URL, globalTempPost, config)
        .then(response => {
          csv().fromString(response.data)
            .then((data) => res.json({
              data: data.map(x => ({time: x._time, value: x._value})),
              unit: '°C'
            }))
        })
        .catch(error => res.json(error));
    });

    apiRouter.get(`/luminosity`, (req, res) => {
      axios.post(process.env.URL, globalLumPost, config)
        .then(response => {
          csv().fromString(response.data)
            .then((data) => res.json({
              data: data.map(x => ({time: x._time, value: x._value})),
              unit: 'lux'
            }))
        })
        .catch(error => res.json(error));
    });

    apiRouter.get(`/humidity/air`, (req, res) => {
      axios.post(process.env.URL, globalHumPost, config)
        .then(response => {
          csv().fromString(response.data)
            .then((data) => res.json({
              data: data.map(x => ({time: x._time, value: x._value})),
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