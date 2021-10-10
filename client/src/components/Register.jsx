import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <>
      <Form className="my-4">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="password"
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already have account ?{" "}
        <span>
          {" "}
          <Link to="/login">
            {" "}
            <Button variant="info" size="sm" className="ml-2">
              Login
            </Button>{" "}
          </Link>{" "}
        </span>{" "}
      </p>
    </>
  );
};

export default Register;
