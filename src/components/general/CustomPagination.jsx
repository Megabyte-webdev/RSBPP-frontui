import React, { useState } from 'react'


const today = new Date();
const currentMonth = today.getMonth(); // 0 (January) to 11 (December)

const data = [];

// Loop 15 times to create objects
for (let i = 0; i < 15; i++) {
    // Create random date within current month
    const randomDate = new Date(today.getFullYear(), currentMonth, Math.floor(Math.random() * 31) + 1);

    // Create a random duration (1 to 7 days)
    const randomDuration = Math.floor(Math.random() * 7) + 1;

    data.push({
        id: i + 1, // IDs from 1 to 15
        title: `live class day ${randomDate.getDate()}`,
        start: randomDate,
        end: new Date(randomDate.setDate(randomDate.getDate() + randomDuration)),
    });
}

const itemsPerPage = 5

const CustomPagination = () => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total number of pages
    const totalPages = Math.ceil(data.length / itemsPerPage);
  
    // Get data for the current page
    const currentPageData = data.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    // Function to handle page change
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    // Generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
  return (
    <div>
        <div>
      {/* Render current page data */}
      {currentPageData.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}

      {/* Pagination buttons */}
      <ul className="pagination">
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={currentPage === pageNumber ? 'active' : ''}>
            <button onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}

export default CustomPagination