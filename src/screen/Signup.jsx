import { useState, useEffect } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Registration() {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    number: '',
  });

  const [alreadyUser, setAlreadyUser] = useState(false); // State to track if the user already exists

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.name || !credentials.email || !credentials.password || !credentials.location || !credentials.number) {
      toast.error('Please Fill in all the details below before creating an Account.');
      return;
    }
    // Check if the number has at least 11 digits and not more than 11 digits
    else if (credentials.number.length !== 11) {
      toast.error('Number should have exactly 11 digits.');
      return;
    }
    else if (credentials.password.length < 6 || credentials.password.length > 12) {
      toast.error('Password should be between 6 and 12 characters.');
      return;
    }


    try {
      const response = await fetch('http://localhost:4000/api/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const json = await response.json();
      console.log(json); // You can handle the response data here

      if (!json.success) {
        if (json.errors && json.errors.length > 0) {
          const errorMessages = json.errors.map((error) => error.msg).join(' ');
          toast.error(errorMessages);
        } else if (json.message) {
          toast.warning('User already exists. Please use a different email or number.');
          setAlreadyUser(true); // Set alreadyUser state if the user already exists
        } else {
          toast.error('Invalid Credentials.');
        }
      } else {
        toast.success('Account created successfully!');
        // Redirect to the login page after successful registration
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000); // Redirect after 2 seconds
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
    setAlreadyUser(false); // Reset alreadyUser state on input change
  };
  useEffect(() => {
    if (alreadyUser) {
      const timer = setTimeout(() => {
        setAlreadyUser(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [alreadyUser]);


  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4 mt-4 mb-4 shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center">FoodExpress</h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          name="name"
                          value={credentials.name}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter Email"
                          name="email"
                          value={credentials.email}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={credentials.password}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="location">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Location"
                          name="location"
                          value={credentials.location}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="number">
                        <Form.Label>Enter Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Number"
                          name="number"
                          value={credentials.number}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      {alreadyUser && <div className="alert alert-warning">User already exists. Please use a different email or number.</div>}

                      <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
                      <div className="d-grid">
                        <Button className='bg-success' variant="primary" type="submit">
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0 text-center">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary fw-bold">
                          Sign In
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
      <ToastContainer />
    </div>
  );
}
