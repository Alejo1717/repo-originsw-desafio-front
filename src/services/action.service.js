import axios from "axios";
import { ENDPOINTs } from "../config/env.config";

const findUserAction = async (userId) => {
    try {
        const res = await axios.get(ENDPOINTs.USER_ACTION + '/' + userId);
        return res.data
    } catch (error) {
        return error.response.data
    }
}
const createUserAction = async (params) => {
    console.log(ENDPOINTs.USER_ACTION + '/create', params)
    try {
        const res = await axios.post(ENDPOINTs.USER_ACTION + '/create', params);
        console.log('res', res)
        return res.data
    } catch (error) {
        return error.response.data
    }
}
const deleteUserAction = async (params) => {
    console.log(ENDPOINTs.USER_ACTION + '/delete', params)
    try {
        const res = await axios.post(ENDPOINTs.USER_ACTION + '/delete', params);
        console.log('res.data', res.data)
        return res.data
    } catch (error) {
        return error.response.data
    }
}
export {
    findUserAction,
    createUserAction,
    deleteUserAction
}