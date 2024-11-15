import axios from "axios";

const professorFetch = axios.create({
    baseURL: "http://localhost:8081/subject",
    headers: {
        "Content-Type": "application/json",
    },
});

export default professorFetch;