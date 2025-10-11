const { InfluxDB } = require('@influxdata/influxdb-client');
const { find, groupBy } = require('rxjs');

const token = process.env.INFLUX_TOKEN
const org = process.env.INFLUX_ORG

const client = new InfluxDB({ url: process.env.INFLUX_URL, token: token })

const queryApi = client.getQueryApi(org)

const queryBat = `
from(bucket: "LoRa")
  |> range(start: -24h, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "device_frmpayload_data_data_Lux")
  |> sort(columns: ["_time"], desc: true)`


const influxConnectBat = async () => {
    const batData = [];

    await queryApi
        .collectRows(queryBat /*, you can specify a row mapper as a second arg */)
        .then(data => {
            data.forEach((x) => {
                
                batData.push({ time: x._time, messurement: 'Battery', device: x.device_name, value: x._value });
            })
            console.log('\nCollect ROWS SUCCESS');
        })
        .catch(error => {
            console.error(error)
            console.log('\nCollect ROWS ERROR')
        })

    return ({ batData })
}

module.exports = influxConnectBat;