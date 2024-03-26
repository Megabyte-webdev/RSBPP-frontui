import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const RegOnboarding = ({setDisplay}) => {
    const navigate = useNavigate()

    const handleOnboarding = () =>{
        navigate("/")
    }

    return (
        <div className='col-10'>
            <div className='my-5 text-center'>
                <h3>Video Introduction</h3>
                <p>Get up and start running in a few minutes</p>
            </div>
            <div className="video_card border rounded">
                <div className='h-100'>
                    <iframe
                    className='iframe rounded'
                        src="https://www.youtube.com/embed/Oflbho9ZG2U?start=103"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; "
                        allowfullscreen></iframe>
                </div>
            </div>
            <div className="mt-5 col-6 mx-auto">
                <Button 
                onClick={handleOnboarding}
                type="submit" className="brown_bg rounded-3 border-0 w-100">
                    {/* {isLoading && (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )} */}
                    {/* {!isLoading &&  */}
                    Create Account
                    {/* } */}
                </Button>
            </div>
        </div>
    )
}

export default RegOnboarding