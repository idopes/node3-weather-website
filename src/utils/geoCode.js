const request = require('request');

const geoCode = (address, callback) => {
    if (!address) {
        return callback('No location provided');
    }
    const encodedAddress = encodeURIComponent(address.trim());
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoiaWRvcGVzIiwiYSI6ImNrODJ0N2NkMjAzaTYzZ281bG1xbnZlNjQifQ.wbKGctGWUBmaQiibeufiFw&limit=1`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!');
        }
        else if (!body.features.length) {
            callback('Unable to find location, Try another search.');
        }
        else {
            const { center, place_name } = body.features[0];
            callback(undefined, {
                longitude: center[0],
                latitude: center[1],
                location: place_name
            });
        }
    });
};

module.exports = geoCode;