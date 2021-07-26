/* Imports */
const axios = require('axios');
const csv = require("csvtojson");
const express = require('express');
const apiRouter = express.Router();
const moment = require('moment')

let config = {
  headers: {
    "Authorization": `Token ${process.env.TOKEN}`,
    "Content-Type": "application/vnd.flux"
  }
}

const defaultStart = moment('25072021', 'DDMMYYYY').unix();
let startValue;

/* Configuration */
class ApiRouterClass {
  constructor() { };

  getPostData(start, measurement, nodeId, topic) {
    return `from(bucket:"mqtthetic")
    |> range(start:${start})
    |> filter(fn: (r) => r["_measurement"] == "${measurement}")
    |> filter(fn: (r) => r["_field"] == "data_value")
    |> filter(fn: (r) => r["nodeID"] == "${nodeId}")
    |> filter(fn: (r) => r["topic"] == "WEB3-VENIVERDI/${topic}")`
  };

  getWidgetData(arr) {
    let arrValue = arr.map(x => Number(x._value));
    return {
      min: Math.min(...arrValue),
      max: Math.max(...arrValue),
      mean: arrValue.reduce((a, b) => a + b) / arrValue.length,
      last: arrValue[arrValue.length - 1]
    }
  }

  getStartValue(isWidget) {
    return isWidget ? moment().startOf('day').add(2, 'hours').unix() : defaultStart;
  }

  routes() {
    apiRouter.get(`/temperature`, (req, res) => {
      axios.post(process.env.URL, this.getPostData(this.getStartValue(req.query.widget), 'Temperature', 'global', '001/112'), config)
        .then(response => {
          csv().fromString(response.data)
            .then((data) => {
              if (req.query.widget) {
                res.json({
                  data: this.getWidgetData(data),
                  unit: '°C'
                })
              } else {
                res.json({
                  data: data.map(x => ({ time: x._time, value: x._value })),
                  unit: '°C'
                })
              }
            })
        })
        .catch(error => res.json(error));
    });

    apiRouter.get(`/luminosity`, (req, res) => {
      axios.post(process.env.URL, this.getPostData(this.getStartValue(req.query.widget), 'Luminosite', 'global', '001/121'), config)
        .then(response => {
          csv().fromString(response.data)
            .then((data) => {
              if (req.query.widget) {
                res.json({
                  data: this.getWidgetData(data),
                  unit: 'lux'
                })
              } else {
                res.json({
                  data: data.map(x => ({ time: x._time, value: x._value })),
                  unit: 'lux'
                })
              }
            })
        })
        .catch(error => res.json(error));
    });

    apiRouter.get(`/humidity/air`, (req, res) => {
      axios.post(process.env.URL, this.getPostData(this.getStartValue(req.query.widget), 'Humidite', 'global', '001/114'), config)
        .then(response => {
          csv().fromString(response.data)
            .then((data) => {
              if (req.query.widget) {
                res.json({
                  data: this.getWidgetData(data),
                  unit: '%'
                })
              } else {
                res.json({
                  data: data.map(x => ({ time: x._time, value: x._value })),
                  unit: '%'
                })
              }
            })
        })
        .catch(error => res.json(error));
    });

    apiRouter.get(`/humidity/basilic`, (req, res) => {
      axios.post(process.env.URL, this.getPostData(this.getStartValue(req.query.widget), 'Humidite', 'basilic', '004/114'), config)
        .then(response => {
          csv().fromString(response.data)
            .then((data) => {
              if (req.query.widget) {
                res.json({
                  data: this.getWidgetData(data),
                  unit: '%'
                })
              } else {
                res.json({
                  data: data.map(x => ({ time: x._time, value: x._value })),
                  unit: '%'
                })
              }
            })
        })
        .catch(error => res.json(error));
    });

    apiRouter.get(`/humidity/menthe`, (req, res) => {
      axios.post(process.env.URL, this.getPostData(this.getStartValue(req.query.widget), 'Humidite', 'menthe', '005/114'), config)
        .then(response => {
          csv().fromString(response.data)
            .then((data) => {
              if (req.query.widget) {
                res.json({
                  data: this.getWidgetData(data),
                  unit: '%'
                })
              } else {
                res.json({
                  data: data.map(x => ({ time: x._time, value: x._value })),
                  unit: '%'
                })
              }
            })
        })
        .catch(error => res.json(error));
    });

    apiRouter.get(`/humidity/poivron`, (req, res) => {
      axios.post(process.env.URL, this.getPostData(this.getStartValue(req.query.widget), 'Humidite', 'poivron', '003/114'), config)
        .then(response => {
          csv().fromString(response.data)
            .then((data) => {
              if (req.query.widget) {
                res.json({
                  data: this.getWidgetData(data),
                  unit: '%'
                })
              } else {
                res.json({
                  data: data.map(x => ({ time: x._time, value: x._value })),
                  unit: '%'
                })
              }
            })
        })
        .catch(error => res.json(error));
    });

    apiRouter.get(`/humidity/tomate`, (req, res) => {
      axios.post(process.env.URL, this.getPostData(this.getStartValue(req.query.widget), 'Humidite', 'tomate', '002/114'), config)
        .then(response => {
          csv().fromString(response.data)
            .then((data) => {
              if (req.query.widget) {
                res.json({
                  data: this.getWidgetData(data),
                  unit: '%'
                })
              } else {
                res.json({
                  data: data.map(x => ({ time: x._time, value: x._value })),
                  unit: '%'
                })
              }
            })
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