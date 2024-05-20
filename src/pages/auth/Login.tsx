import React, { useEffect, useState, ChangeEvent, MouseEvent, FormEvent } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./Login.css";
import { login } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import { logout, setUserDetails } from "./authSlice";
import { toast } from "react-toastify";
import { ILogin } from "../../interfaces/login.interface";

interface UserData {
  email: string;
  password: string;
  showPassword: boolean;
  isDisabledButton: boolean;
}

const Login: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
    showPassword: false,
    isDisabledButton: false
  });

  const navigate = useNavigate();

  // logout automatically when load login page
  useEffect(() => {
    logout();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // show hide password when click on eye icon
  const handleClickShowPassword = () => {
    setUserData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  // disable submit button to prevent unnecessary api calls
  const disableButton = (status: boolean) => {
    setUserData((prevData) => ({
      ...prevData,
      isDisabledButton: status,
    }));
  };

  // call login api and get token
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      disableButton(true);
      const user: ILogin = { email: userData.email.toLowerCase(), password: userData.password }
      const result = await login(user);
      if (result.statusCode === 200) {
        console.log("Login successful:", result);
        toast.success(result.message);
        setUserDetails(result.data);
        disableButton(false);
        navigate("/dashboard");
      } else {
        disableButton(false);
        console.log("Login successful:", result);
        toast.error(result.message);
      }
    } catch (error) {
      disableButton(false);
      console.error("Error logging in:", error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type={userData.showPassword ? "text" : "password"}
          name="password"
          value={userData.password}
          onChange={handleChange}
          margin="normal"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {userData.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <CustomButton type="submit" variant="contained" fullWidth disabled={userData.isDisabledButton}>
          Login
        </CustomButton>
      </form>
    </div>
  );
};

export default Login;
