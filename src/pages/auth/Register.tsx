import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { TextField, Alert, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./Register.css";
import { register } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import { logout, setUserDetails } from "./authSlice";
import { toast } from "react-toastify";

interface UserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isDisabledButton: boolean;
}

const Register: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    isDisabledButton: false
  });
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const navigate = useNavigate();

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

  const toggleShowPassword = () => {
    setUserData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const toggleShowConfirmPassword = () => {
    setUserData((prevData) => ({
      ...prevData,
      showConfirmPassword: !prevData.showConfirmPassword,
    }));
  };

  const validatePassword = () => {
    const { password, confirmPassword } = userData;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    let isValid = true;

    setPasswordError("");
    setConfirmPasswordError("");

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError("Password requirements not met.");
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    return isValid;
  };

  const disableButton = (status: boolean) => {
    setUserData((prevData) => ({
      ...prevData,
      isDisabledButton: status,
    }));
  };

  const handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!validatePassword()) {
        console.error("Password validation failed");
        return;
      }
      disableButton(true);
      const user = {
        name: userData.name,
        email: userData.email.toLowerCase(),
        password: userData.password
      };
      const newUser = await register(user);
      if (newUser.statusCode === 201) {
        disableButton(false);
        console.log("New User Registered:", newUser);
        toast.success(newUser.message);
        setUserDetails(newUser.data.access_token, newUser.data.name);
        navigate("/dashboard");
      } else {
        disableButton(false);
        toast.error(newUser.message);
      }
    } catch (error) {
      disableButton(false);
      console.error("Error registering user:", error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>

      <form onSubmit={handleRegistration}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          name="name"
          value={userData.name}
          onChange={handleChange}
          margin="normal"
          required
        />

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
                <IconButton onClick={toggleShowPassword}>
                  {userData.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {passwordError && <Alert severity="error">{passwordError}</Alert>}

        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          type={userData.showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
          margin="normal"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowConfirmPassword}>
                  {userData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {confirmPasswordError && <Alert severity="error">{confirmPasswordError}</Alert>}
        <Alert severity="warning">
          Password requirements:
          <ul>
            <li>Minimum length of 8 characters</li>
            <li>Contains at least 1 letter</li>
            <li>Contains at least 1 number</li>
            <li>Contains at least 1 special character</li>
          </ul>
        </Alert>
        <CustomButton type="submit" variant="contained" fullWidth disabled={userData.isDisabledButton}>
          Submit
        </CustomButton>
      </form>
    </div>
  );
};

export default Register;
