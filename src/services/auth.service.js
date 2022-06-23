import axios from "axios";
import { ENDPOINTs } from "../config/env.config";

const login = async (username, password) => {
    try {
        const res= await axios.post(ENDPOINTs.LOGIN, { username: username, password: password });
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export {
    login,
}