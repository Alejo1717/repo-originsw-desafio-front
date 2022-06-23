import axios from "axios";
import { ENDPOINTs } from "../config/env.config";

const getActionData = async (symbol) => {
    try {
        const res = await axios.post(ENDPOINTs.TWELVEDATA + '/action-data', { symbol: symbol });
        return res.data
    } catch (error) {
        return [];
    }

}
const autocompleteList = async () => {
    try {
        const res = await axios.get(ENDPOINTs.TWELVEDATA + '/autocomplete');
        return res.data
    } catch (error) {
        return [];
    }

}

const quotation = async (params) => {
    try {
        const res = await axios.post(ENDPOINTs.TWELVEDATA + '/quotation', params);
        console.log('5555555', res)
        return res.data
    } catch (error) {
        return [];
    }

}

export {
    getActionData,
    autocompleteList,
    quotation
}