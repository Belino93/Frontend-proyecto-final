import axios from "axios";
const baseUrl = 'http://127.0.0.1:8000/api/'

export const getBrands = async () => {
    const brands = await axios.get(baseUrl + 'devices/brand')

    return brands
}