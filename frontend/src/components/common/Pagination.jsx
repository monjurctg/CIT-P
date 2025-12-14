import React from 'react';
import { Pagination } from 'react-bootstrap';

const CommonPagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    let items = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(0, currentPage - 2);
    let endPage = Math.min(totalPages - 1, currentPage + 2);

    if (currentPage < 2) endPage = Math.min(totalPages - 1, 4);
    if (currentPage > totalPages - 3) startPage = Math.max(0, totalPages - 5);

    for (let number = startPage; number <= endPage; number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => onPageChange(number)}>
                {number + 1}
            </Pagination.Item>,
        );
    }

    return (
        <Pagination className="justify-content-center mt-4">
            <Pagination.First onClick={() => onPageChange(0)} disabled={currentPage === 0} />
            <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0} />
            {startPage > 0 && <Pagination.Ellipsis />}
            {items}
            {endPage < totalPages - 1 && <Pagination.Ellipsis />}
            <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages - 1} />
            <Pagination.Last onClick={() => onPageChange(totalPages - 1)} disabled={currentPage === totalPages - 1} />
        </Pagination>
    );
};

export default CommonPagination;
