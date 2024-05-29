import React from 'react';
import classnames from 'classnames';
// import { usePagination, DOTS } from '../utils/usePagination';
// import './pagination.scss';
// import '../../assets/css/pagination.scss';
import { usePagination, DOTS } from '../utils/usePagination'; 
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
const Pagination =( props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange?.length - 1];
  return (
    <div
      className="d-flex"
    >
      <button
      disabled={currentPage === 1}
        className="btn border inherit_text nav_btn btn-sm"
        onClick={onPrevious}
      >
        <MdChevronLeft size={20} />
      </button>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <button key={pageNumber} className="btn btn-sm p-1">&#8230;</button>;
        }

        return (
          <button
          style={{ fontWeight: currentPage === pageNumber ? "600" : "normal" }}
          key={pageNumber}
            className="btn btn-sm"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
          disabled={ currentPage === lastPage}
        className="btn border inherit_text nav_btn btn-sm"
        onClick={onNext}
      >
        <MdChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;