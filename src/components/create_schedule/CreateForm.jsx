import React from 'react'

const CreateForm = () => {
    return (
        <div className='p-3 py-5'>
            <form >
                <div className='bg-white rounded-3 shadow p-3 py-5'>
                    <div>
                        <h4>Choose RSBPP Faculty</h4>
                    </div>
                    <div className="form-floating mb-3">
                        <select className="form-select" id="faculty" aria-label="Floating label select example">
                            <option selected>...</option>
                            <option value="1">Executive class</option>
                            <option value="2">Business class</option>
                            <option value="3">Economic class</option>
                        </select>
                        <label htmlFor="faculty">Faculty of Business, Communication and Finance</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select className="form-select" id="program" aria-label="Floating label select example">
                            <option selected>...</option>
                            <option value="1">MANAGEMENT PROGRAMMES</option>
                            <option value="2">Business class</option>
                            <option value="3">Economic class</option>
                        </select>
                        <label htmlFor="program">Select a programme from faculty</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select className="form-select" id="program" aria-label="Floating label select example">
                            <option selected>...</option>
                            <option value="1">Design Thinking & Innovation</option>
                            <option value="2">Strategy Execution</option>
                            <option value="3">Women in Leadership</option>
                            <option value="3">Negotiation Dynamics</option>
                        </select>
                        <label htmlFor="program">Select Chapters</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select className="form-select" id="subTitles" aria-label="Floating label select example">
                            <option selected>...</option>
                            <option value="1">Read & Write</option>
                            <option value="2">Display birthdays</option>
                            <option value="3">anniversaries</option>
                            <option value="3">Others</option>
                        </select>
                        <label htmlFor="subTitles">Select Sub Titles</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select className="form-select" id="subTitles" aria-label="Floating label select example">
                            <option selected>...</option>
                            <option value="1">Read only - To track team availability</option>
                        </select>
                        <label htmlFor="subTitles">Select Class Type</label>
                    </div>
                    <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a comment here" id="description" style={{ height: "150px" }}></textarea>
                        <label htmlFor="description">Description</label>
                    </div>
                </div>
                <div className="my-4">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <label htmlFor="dateAndTime" className="col-5 col-form-label">Date and time *</label>
                                <div className="col-7">
                                    <input type="datetime-local" className="form-control" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <label htmlFor="endTime" className="col-5 col-form-label">To</label>
                                <div className="col-7">
                                    <input type="datetime-local" className="form-control" id="endTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <label htmlFor="setDuration" className="col-5 col-form-label">Set Duration</label>
                                <div className="col-7">
                                    <select id="setDuration" className="form-select">
                                        <option selected>Choose...</option>
                                        <option>1 Hour</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-3 d-flex justify-content-center">
                    <div className="fw-semibold">
                        <button className='btn fw-semibold normal_btn border-primary outline-primary me-3 text-primary'>Cancel</button>
                        <button className='btn fw-semibold normal_btn btn-primary text-white'>Save</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateForm