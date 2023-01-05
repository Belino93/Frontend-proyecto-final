import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api/";
const token = localStorage.getItem('token')
const config = {
  headers: { Authorization: "Bearer " + token },
};

export const getBrands = async (userToken) => {
  
  const brands = await axios.get(baseUrl + "devices/brand", config);

  return brands;
};

export const loginUser = async (user) => {
  const loginData = await axios.post(baseUrl + "login", {
    email: user.email,
    password: user.password,
  });
  if (loginData.data.token !== undefined) {
    let config = {
      headers: { Authorization: "Bearer " + loginData.data.token },
    };
    const userData = await axios.get(baseUrl + "profile", config);
    return { 
        token: loginData.data.token,
        user:userData.data
     };
  }
  return loginData;
};

export const registerUser = async (user) => {
  const registerData = await axios.post(baseUrl + 'register', {
    name:user.name,
    surname:user.surname,
    email:user.email,
    password:user.password,
  })

  return registerData
}

export const getUserRepairs = async(userToken) => {
  const userRepairs = await axios.get(baseUrl + 'user/repairs', config)
  return userRepairs
}