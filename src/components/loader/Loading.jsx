import React from 'react'
import "./loader.css"

const Loading = () => {
    return (
        <div className='min-vh-100 d-flex justify-content-center align-items-end'>
            {/* <div className="loader"></div> */}
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading