import axios from "axios";
const baseUrl = 'http://127.0.0.1:8000/api/'

export const getBrands = async () => {
    const brands = await axios.get(baseUrl + 'devices/brand')

    return brands
}

export const loginUser = async (user) => {
    const loginData = await axios.post(baseUrl + "login", {
        email: user.email,
        password:user.password,
    });
    return loginData

}