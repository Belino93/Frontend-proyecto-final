import axios from "axios";
const baseUrl = "https://backend-proyecto-final-production-8f16.up.railway.app/api/";
const token = localStorage.getItem("token");
const config = {
  headers: { Authorization: "Bearer " + token },
};

export const getBrands = async () => {
  const brands = await axios.get(baseUrl + "devices/brand", config);

  return brands;
};
export const getProfile = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: "Bearer " + token },
  };
  const userData = await axios.get(baseUrl + "profile", config);

  return userData.data;
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
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: "Bearer " + token },
  };
  const repairs = await axios.get(baseUrl + "repairs", config);

  return repairs;
};
export const getAllUsersRepairs = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: "Bearer " + token },
  };
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
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: "Bearer " + token },
  };
  const body = { brand: brandName };
  const devices = await axios.post(baseUrl + "devices/brand", body, config);

  return devices;
};
export const newUserRepair = async (userRepair) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: "Bearer " + token },
  };
  const body = userRepair;
  const devices = await axios.post(baseUrl + "user/repairs", body, config);

  return devices;
};
export const nextRepairState = async (deviceRepairId) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: "Bearer " + token },
  };
  const body = { device_repair_id: deviceRepairId };
  const devices = await axios.patch(
    baseUrl + "user/repairs/next",
    body,
    config
  );

  return devices;
};
export const prevRepairState = async (deviceRepairId) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: "Bearer " + token },
  };
  const body = { device_repair_id: deviceRepairId };
  const devices = await axios.patch(
    baseUrl + "user/repairs/prev",
    body,
    config
  );

  return devices;
};
export const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: "Bearer " + token },
  };
  const userRepairs = await axios.get(baseUrl + "users", config);

  return userRepairs;
};

export const deleteUserByAdmin = async (body) => {
  const token = localStorage.getItem("token");
  const userDeleted = await axios.delete(baseUrl + "users/delete", {
    headers: { Authorization: "Bearer " + token },
    data: body,
  });

  return userDeleted;
};
export const upgradeUserToAdmin = async (body) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: "Bearer " + token },
  };
  const userUpdated = await axios.patch(baseUrl + "users/admin", body, config);

  return userUpdated;
};
export const updateUser = async (body) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: "Bearer " + token },
  };
  const userUpdated = await axios.patch(baseUrl + "users", body, config);

  return userUpdated;
};
export const newDevice = async (body) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: "Bearer " + token },
  };
  const device = await axios.post(baseUrl + "devices/new", body, config);

  return device;
};
export const newRepair = async (body) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: "Bearer " + token },
  };
  const device = await axios.post(baseUrl + "repairs/", body, config);

  return device;
};