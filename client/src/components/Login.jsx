import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();

  //viet lai ham login
  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      console.log(loginData);

      if (loginData.success) history.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeLoginForm = (e) =>
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });

  const { username, password } = loginForm;

  return (
    <>
      <Form className="my-4" onSubmit={(e) => login(e)}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => onChangeLoginForm(e)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => onChangeLoginForm(e)}
            value={password}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Dont have account ?{" "}
        <span>
          {" "}
          <Link to="/register">
            {" "}
            <Button variant="info" size="sm" className="ml-2">
              Register
            </Button>{" "}
          </Link>{" "}
        </span>{" "}
      </p>
    </>
  );
};

export default Login;
