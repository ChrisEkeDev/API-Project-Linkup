
const getLocationData = async (address) => {
    let encodedAddress = encodeURI(address);
    let url = `https://google-maps-geocoding.p.rapidapi.com/geocode/json?address=${encodedAddress}&language=en`;
    const options = {
        method: 'GET',
	    headers: {
            'X-RapidAPI-Key': '4a0ad7c7e7msha0429667c807fadp12d14fjsn6d59816bd58f',
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
