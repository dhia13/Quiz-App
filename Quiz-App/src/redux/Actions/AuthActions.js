import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  loginErr,
  loginSuccess,
  logout,
  validToken,
  invalidToken,
  setCoins,
  setSolved,
} from "../Types";
import { API_URL } from "../../env";
export const loginAction = (username, password) => async (dispatch) => {
  await axios
    .post(`${API_URL}users/login`, {
      username: username,
      password: password,
    })
    .then((response) => {
      if (response.data.success === true) {
        dispatch({
          type: loginSuccess,
          payload: {
            token: response.data.accessToken,
            username: response.data.username,
            role: response.data.role,
            coins: response.data.coins,
          },
        });
        dispatch({
          type: setSolved,
          payload: response.data.solved,
        });
      }
    })
    .catch((err) => {
      if (err.response.status && err.response.status === 401) {
        dispatch({
          type: loginErr,
          payload: "Wrong Credentials",
        });
      } else {
        dispatch({
          type: loginErr,
          payload: "server is down",
        });
      }
    });
};
export const logoutAction = () => async (dispatch) => {
  await AsyncStorage.removeItem("token");
  dispatch({
    type: logout,
  });
};
export const checkToken = (token) => async (dispatch) => {
  axios
    .post(`${API_URL}users/checkToken`, {
      token: token,
    })
    .then((response) => {
      if (response.data.success === true) {
        dispatch({
          type: validToken,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: invalidToken,
      });
    });
};
export const setCoinsValue = (coins, token) => async (dispatch) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  await axios
    .put(`${API_URL}quiz/updateCoins`, { coins }, { headers })
    .then((response) => {
      dispatch({
        type: setCoins,
        payload: coins,
      });
    })
    .catch((error) => {
      console.log("err from update coins");
    });
};
