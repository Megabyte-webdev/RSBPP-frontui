import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import RegistrationGuide from '../components/auth/RegistrationGuide'
import RegistrationForm from '../components/auth/RegistrationForm'
import RegOtpForm from '../components/auth/RegOtpForm'
import RegOnboarding from '../components/auth/RegOnboarding'

const Registration = () => {

    const [display, setDisplay] = useState("onboarding")

  return (
    <div>
        <Row className='g-0'>
            <Col md={5}>
                <RegistrationGuide />
            </Col>
            <Col md={7}>
                <div className="d-flex h-100 align-items-center justify-content-center">
                    {display === "registration" && (<RegistrationForm />)}
                    {display === "otp" && (<RegOtpForm />)}
                    {display === "onboarding" && (<RegOnboarding />)}
                    
                    {/* <RegOtpForm/> */}
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default Registration