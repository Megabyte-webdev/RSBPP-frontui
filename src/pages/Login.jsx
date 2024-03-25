import React from 'react'
import { Col, Row } from 'react-bootstrap'
import LoginComponent from '../components/auth/LoginComponent'
import loginImg from "../assets/login-img1.png"
const Login = () => {
  return (
    <div style={{ maxHeight: "100vh" }}>
        <Row className='g-0'>
            <Col md={7}>
                <LoginComponent />
            </Col>
            <Col md={5}>
                <div>
                    <img src={loginImg} alt="" style={{ height: "100vh" }} className='img-fluid w-100'/>
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default Login