const { InfluxDB } = require('@influxdata/influxdb-client');
const { find } = require('rxjs');

const token = process.env.INFLUX_TOKEN
const org = process.env.INFLUX_ORG

const client = new InfluxDB({ url: process.env.INFLUX_URL, token: token })

const queryApi = client.getQueryApi(org)

const queryHum = `
from(bucket: "LoRa")
  |> range(start: -24h, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "device_frmpayload_data_data_Humidity")
  |> sort(columns: ["_time"], desc: true)`


const influxConnectHum = async () => {
    const humData = [];
    await queryApi
        .collectRows(queryHum /*, you can specify a row mapper as a second arg */)
        .then(data => {
            data.forEach((x) => {
                let splitDate1 = x._time.split('T');
                let splitDate2 = splitDate1[1].split('.')
                let splitDateTime = splitDate1[0] + ' ' + splitDate2[0];
                humData.push({ time: splitDateTime, messurement: 'Humidity', device: x.device_name, value: x._value });
            })
            console.log('\nCollect ROWS SUCCESS');
        })
        .catch(error => {
            console.error(error)
            console.log('\nCollect ROWS ERROR')
        })
    return ({ humData })
}

module.exports = influxConnectHum;