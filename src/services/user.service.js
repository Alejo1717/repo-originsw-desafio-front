import axios from "axios";
import { ENDPOINTs } from "../config/env.config";

const login = async (email, password) => {
    return await axios.post(ENDPOINTs.LOGIN, { email: email, password: password });
}

export {
    login,
}