import axios from "axios";
import { useState } from "react";
import DefaultURL from "../GlobalVariables";


function Register() {
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfos, setAlertInfos] = useState(["", ""]);

  const onSubmit = async (values) => {
    setError("");

    try {
      const response = await axios.post(`${DefaultURL}/users/register`, values);

      if (response.data !== "") {
        setShowAlert(true);
        setAlertInfos(["success", "Successfully Registered!"]);
        console.log(values.email);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const registerData = {
      name: formData.get("username"),
      phoneNumber: formData.get("phoneNumber"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    onSubmit(registerData);
  };

  return (
    <div>
      {showAlert && <div>{alertInfos[1]}</div>}
      <form onSubmit={onSave}>
        {/* Your form fields go here */}
        <input type="text" name="username" placeholder="Username" required />
        <input type="number" name="phoneNumber" placeholder="Phone Number" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <select name="role" required>
          <option value="ROLE_CUSTOMER">Customer</option>
          <option value="ROLE_BARBER">Barber</option>
        </select>
        <input type="checkbox" name="checkbox" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
