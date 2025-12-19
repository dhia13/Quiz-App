import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkToken } from "./redux/Actions/AuthActions";
import Login from "./screens/Login";
import Navigation from "./Navigation";
export const AppWindow = () => {
  const logged = useSelector((state) => state.AuthReducer.logged);
  const token = useSelector((state) => state.AuthReducer.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkToken(token));
  }, []);

  return logged ? <Navigation /> : <Login />;
};
