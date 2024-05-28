import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      // Check if the fetch request was successful (status code 2xx)
      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      // Check if the response contains JSON data
      const json = await response.json();
      console.log(json);

      if (!json.success) {
        // Handle unsuccessful response
        setMessage('Login failed. Please Try again.');
      } else {
        // Handle successful response
        setMessage('Login successfull!');
        // Redirect to the home page after successful login
        setTimeout(() => {
          setMessage('');
          localStorage.setItem('authtoken',json.authtoken);
          console.log(localStorage.getItem('authtoken'));

          navigate('/');
        }, 1000);
      }
    } catch (error) {
      setMessage('Login failed. Please check your Email or Password.');
      setTimeout(() => {
        setMessage('');
      
      }, 2000);
      
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4 shadow">
              <Card.Body>
                <div className="mb-3 mt-md-3">
                  <h2 className="fw-bold mb-2 text-center">Login</h2>
                  <div className="mb-4">
                    {message && <div className="alert alert-primary">{message}</div>}
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter Email"
                          name="email"
                          value={credentials.email}
                          onChange={onChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={credentials.password}
                          onChange={onChange}
                        />
                      </Form.Group>

                      <div className="d-grid ">
                        <Button className='bg-success' variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0 text-center">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-primary fw-bold">
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
