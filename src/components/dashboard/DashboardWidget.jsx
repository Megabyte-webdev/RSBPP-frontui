// import { useContext, useState } from "react"
// import Widget from "../auth/Widget"
// import { UserContext } from "../../context/AuthContext"

// const DashboardWidget = () => {
//     const {widgetOpen, setWidgetOpen} = useContext(UserContext)
    
//     const handleDisplay = () => (
//         setWidgetOpen((prev) => {
//             return {
//                 ...prev, display: "none"
//             }
//         })
//     )

//     // console.count("render")
//     // console.log(widgetOpen)
//     return (
//         <div>
//             {widgetOpen && (
//                 <div
//                     style={widgetOpen}
//                     className="modal fade show"
//                     id="staticBackdrop"
//                     data-bs-backdrop="static"
//                     data-bs-keyboard="false"
//                     tabIndex="-1"
//                     aria-labelledby="staticBackdropLabel"
//                     aria-hidden="true"
//                     aria-modal="true"
//                     role="dialog"
//                 >
//                     <div className="modal-dialog modal-dialog-scrollable modal-lg">
//                         <div className="modal-content h-100">
//                             <div className="modal-header">
//                                 <h1 className="modal-title fs-5" id="staticBackdropLabel">Widget</h1>
//                                 <button
//                                     onClick={() => handleDisplay()}
//                                     type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                             </div>
//                             <div className="modal-body px-md-5">
//                                 <Widget widgetOpen={widgetOpen}  handleDisplay={handleDisplay} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default DashboardWidget