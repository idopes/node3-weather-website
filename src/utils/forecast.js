const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/f78c7817581c4c208e5dbbe6a5a5ec6e/${latitude},${longitude}?units=si`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!');
        } else if (body.error) {
            callback('Unable to find location');
        }

        else {
            const { temperature, precipProbability } = body.currently;
            const { summary } = body.daily.data[0];
            callback(undefined, `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain`);
        }
    });
};

module.exports = forecast;
