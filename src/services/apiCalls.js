import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api/";
const token = localStorage.getItem("token");
const config = {
  headers: { Authorization: "Bearer " + token },
};

export const getBrands = async () => {
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
      user: userData.data,
    };
  }
  return loginData;
};

export const registerUser = async (user) => {
  const registerData = await axios.post(baseUrl + "register", {
    name: user.name,
    surname: user.surname,
    email: user.email,
    password: user.password,
  });

  return registerData;
};

export const getUserRepairs = async () => {
  const token = localStorage.getItem("token");
  const config = {
  headers: { Authorization: "Bearer " + token },
  };
  const userRepairs = await axios.get(baseUrl + "user/repairs", config);
  return userRepairs;
};

export const getAllRepairs = async () => {
  const repairs = await axios.get(baseUrl + "repairs", config);
  return repairs;
};
export const getAllUsersRepairs = async () => {
  const userRepairs = await axios.get(baseUrl + "admin/repairs", config);
  return userRepairs;
};
export const getUserRepairsByImei = async (input) => {
  const imei = { imei: input };
  const userRepairs = await axios.post(
    baseUrl + "user/repairs/imei",
    imei,
    config
  );
  return userRepairs;
};
export const getDevicesByBrand = async (brandName) => {
  const body = { brand: brandName };
  const devices = await axios.post(baseUrl + "devices/brand", body, config);
  return devices;
};
export const newUserRepair = async (userRepair) => {
  const body = userRepair;
  const devices = await axios.post(baseUrl + "user/repairs", body, config);
  return devices;
};
export const nextRepairState = async (deviceRepairId) => {
  const body = {device_repair_id:deviceRepairId};
  const devices = await axios.patch(baseUrl + "user/repairs/next", body, config);
  return devices;
};
export const prevRepairState = async (deviceRepairId) => {
  const body = {device_repair_id:deviceRepairId};
  const devices = await axios.patch(baseUrl + "user/repairs/prev", body, config);
  return devices;
};




