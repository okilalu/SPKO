import React from "react";

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  handlePageChange,
}) {
  const totalPage = Math.ceil(totalItems / itemsPerPage);
  const handleNext = () => {
    if (currentPage < totalPage) {
      handlePageChange(currentPage + 1);
    }
  };
  const handlePrev = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };
  return (
    <div className="join mt-5 flex items-center justify-center">
      <button className="join-item btn" onClick={handlePrev}>
        Prev.
      </button>
      <div className="join-item btn">{currentPage}</div>
      <button className="join-item btn" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}
