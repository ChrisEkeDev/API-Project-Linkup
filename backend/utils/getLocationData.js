
const getLocationData = async (address) => {
    let encodedAddress = encodeURI(address);
    let url = `https://google-maps-geocoding.p.rapidapi.com/geocode/json?address=${encodedAddress}&language=en`;
    const options = {
        method: 'GET',
	    headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'google-maps-geocoding.p.rapidapi.com'
	    }
    };

    try {
        const response = await fetch(url, options);
        const addressData = await response.json();
        if (addressData.status === 'OK') {
            const addressObj = {};
            let formattedAddress = addressData.results[0].formatted_address.split(', ');
            const [ street, city, state ] = formattedAddress;
            addressObj.street = street
            addressObj.city = city;
            addressObj.state = state;
            addressObj.lat = addressData.results[0].geometry.location.lat;
            addressObj.lng = addressData.results[0].geometry.location.lng;
            return addressObj
        }
    } catch(error) {
        console.log(error)
    }
}


module.exports = { getLocationData };
