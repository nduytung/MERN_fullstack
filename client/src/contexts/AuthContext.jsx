//tat ca state cua login va register quang vao day
import { createContext, useReducer } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./Constants";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  const loginUser = async (loginForm) => {
    try {
      console.log(loginForm);

      const response = await axios.post(`${apiUrl}/auth/login`, loginForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      return response.data;
    } catch (err) {
      console.log("LOGIN ERR: " + err);
    }
  };

  //export ham login
  const authContextData = { loginUser };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
