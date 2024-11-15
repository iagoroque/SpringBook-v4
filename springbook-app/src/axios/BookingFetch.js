import axios from "axios";

const bookingFetch = axios.create({
    baseURL: "http://localhost:8080/booking",
    headers: {
        "Content-Type": "application/json",
    },
});

export default bookingFetch;