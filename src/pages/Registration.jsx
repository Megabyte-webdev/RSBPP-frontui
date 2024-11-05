import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import RegistrationGuide from '../components/auth/RegistrationGuide'
import RegistrationForm from '../components/auth/RegistrationForm'
import RegOtpForm from '../components/auth/RegOtpForm'
import RegOnboarding from '../components/auth/RegOnboarding'
//import Widget from '../components/auth/Widget'

const Registration = () => {

    const [display, setDisplay] = useState("registration")

  return (
    <div>
        <Row className='g-0'>
            <Col md={5}>
                <RegistrationGuide display={display} />
            </Col>
            <Col md={7}>
                <div className="d-flex h-100 align-items-center justify-content-center">
                    {display === "registration" && (<RegistrationForm setDisplay={setDisplay} />)}
                    {display === "otp" && (<RegOtpForm setDisplay={setDisplay} />)}
                    {display === "onboarding" && (<Widget setDisplay={setDisplay} />)}
                    {/* {display === "onboarding" && (<RegOnboarding setDisplay={setDisplay} />)} */}
                    
                    {/* <RegOtpForm/> */}
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default Registration