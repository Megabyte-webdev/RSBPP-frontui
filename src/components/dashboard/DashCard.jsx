
const DashCard = ({item}) => {
    return (
        <div className="shadow d-flex rounded p-2">
            <div className="me-2 py-4">
                <img src={item.img} alt="" height={50} width={50} className="" />
            </div>
            <div>
                <p className="fw-bold">{item.number}</p>
                <p className="fw-3">{item.text}</p>
            </div>
        </div>
    )
}

export default DashCard