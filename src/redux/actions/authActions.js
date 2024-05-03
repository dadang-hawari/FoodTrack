import axios from "axios";
import { toast } from "react-toastify";
import { setToken, setUserData } from "../reducers/authReducers";
import ValidateEmail from "../../utils/validateEmail";

export const authMe = (navigate, path) => async (dispatch, getState) => {
  const { token, loginWith } = getState()?.auth;
  if (loginWith === "facebook" || token === null) return;
  try {
    const response = await axios.get(`https://shy-cloud-3319.fly.dev/api/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      dispatch(setUserData(response?.data));
    } else {
      console.log("response :>> ", response);
    }
  } catch (err) {
    console.log("err auth :>> ", err);
    if (err.response.status === 401) {
      dispatch(setUserData(null));
      dispatch(setToken(null));
      path === "/" || "/home" || "/food-list"
        ? toast.info("Token expired, please sign in")
        : navigate("/", {
            state: {
              info: "Token expired, please sign in",
            },
          });
    }
  }
};

export const registUser =
  ({ name, email, password }, navigate) =>
  async () => {
    try {
      if (name.trim().length === 0 && email.trim().length === 0 && password.trim().length === 0) {
        toast.info("Please fill out all fields", {
          toastId: "toastInfo",
        });
        return;
      } else if (name.trim().length === 0) {
        toast.info("Name is required", {
          toastId: "toastInfo",
        });
        return;
      } else if (email.trim().length === 0) {
        ValidateEmail(email);
        return;
      } else if (password.trim().length === 0) {
        toast.info("Password is required", {
          toastId: "toastInfo",
        });
      }

      if (ValidateEmail(email) === true) {
        const response = await axios.post(
          "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
          {
            email: email,
            name: name,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;

        if (response.status === 201) {
          navigate("/login", { state: { success: "Account created" } });
        }
      }
    } catch (error) {
      console.error("Error:", error.response.data.message);
      toast.error(error.response.data.message, {
        toastId: "toastError",
      });
    }
  };

export const loginUser =
  ({ email, password }, navigate) =>
  async (dispatch) => {
    if (email.trim().length === 0 && password.trim().length === 0) {
      toast.info("Please fill out all fields", {
        toastId: "toastInfo",
      });
      return;
    } else if (email.trim().length === 0) {
      ValidateEmail(email);
      return;
    } else if (password.trim().length === 0) {
      toast.info("Password is required", {
        toastId: "toastInfo",
      });
      return;
    }

    try {
      toast.loading("wait", {
        toastId: "toastWait",
      });
      const response = await axios.post("https://shy-cloud-3319.fly.dev/api/v1/auth/login", {
        email: email,
        password: password,
      });
      const data = response.data.data;
      if (response.status === 200) {
        dispatch(setToken(data.token));
        navigate("/", {
          state: {
            success: "Login successful",
          },
        });
        toast.dismiss("toastWait");
      }
    } catch (error) {
      toast.dismiss("toastWait");

      toast.info(error.response.data.message, { toastId: "toastInfo" });

      console.error("error", error);
    }
  };

export const loginWithGoogle = (codeResponse, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/google",

      {
        access_token: `${codeResponse?.access_token}`,
      }
    );

    dispatch(setToken(response.data.data.token));
    toast.dismiss("toastLoading");
    navigate("/", {
      state: { success: "Login successfull" },
    });
  } catch (error) {
    console.error("Error:", error);
    toast.error(error);
  }
};
