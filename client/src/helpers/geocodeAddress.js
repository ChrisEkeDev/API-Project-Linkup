import axios from "axios";

export const geocodeAddress = async (e, address, cb) => {
    e.preventDefault();
    try {
        const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        const response = await axios.get(apiUrl);
        const { data } = response;
        if (response.status === 200 && data.status === "OK") {
            const location = data.results[0];
            const newData = {};
            newData.address = location.formatted_address;
            newData.lat = location.geometry.location.lat;
            newData.lng = location.geometry.location.lng;
            cb("success");
            return newData
        }
    } catch(e) {
        console.log(e)
    }
};
