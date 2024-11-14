import axios from "axios";

const labFetch = axios.create({
    baseURL: "http://localhost:8082/lab",
    headers: {
        "Content-Type": "application/json",
    },
});

export default labFetch;