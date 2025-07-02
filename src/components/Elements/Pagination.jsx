import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import "../../assets/css/paginationStyle.css";
import CustomDropdown from "./DropDown";

const Pagination = ({
  list = [],
  children,
  title = "Items",
  className = "",
  listName,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calculate pagination values
  const totalPages = Math.ceil(list.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = list.slice(startIndex, endIndex);
  const numbers = ["5", "10", "25", "50", "100"];

  // Generate page numbers for pagination controls
  const getPageNumbers = () => {
    if (totalPages <= 1) return [];

    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    // Always include first page
    if (totalPages === 1) return [1];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className={`pagination-container ${className}`}>
      {/* Items per page selector */}
      <div className="items-per-page-section">
        <div className="items-per-page-controls">
          <label className="items-per-page-label">Show:</label>
          <CustomDropdown
            options={numbers}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className={"items-per-page-select"}
          />
          <span className="items-per-page-label">entries</span>
        </div>

        <div className="showing-text">
          Showing {currentData.length} of {list.length} {title.toLowerCase()}
        </div>
      </div>

      {/* Render children with paginated data */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            [listName]: currentData,
            // Keep all other props
            ...child.props,
          });
        }
        return child;
      })}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <>
          <div className="pagination-info">
            <div className="pagination-info-text">
              Showing {startIndex + 1} to {Math.min(endIndex, list.length)} of{" "}
              {list.length} results
            </div>

            <div className="pagination-controls">
              {/* First page */}
              <button
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                className="pagination-button"
                title="First page"
              >
                <ChevronsLeft size={16} />
              </button>

              {/* Previous page */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
                title="Previous page"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Page numbers */}
              <div className="page-numbers">
                {pageNumbers.map((pageNum, index) =>
                  pageNum === "..." ? (
                    <span key={`dots-${index}`} className="page-dots">
                      ...
                    </span>
                  ) : (
                    <button
                      key={`page-${pageNum}`}
                      onClick={() => goToPage(pageNum)}
                      className={`page-button ${
                        currentPage === pageNum ? "active" : ""
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                )}
              </div>

              {/* Next page */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button"
                title="Next page"
              >
                <ChevronRight size={16} />
              </button>

              {/* Last page */}
              <button
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                className="pagination-button"
                title="Last page"
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>

          {/* Quick jump to page */}
          <div className="page-jump-section">
            <label className="page-jump-label">Go to page:</label>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (!isNaN(page) && page >= 1 && page <= totalPages) {
                  goToPage(page);
                }
              }}
              className="page-jump-input"
            />
            <span className="page-jump-label">of {totalPages}</span>
          </div>
        </>
      )}

      {/* Show message when no items */}
      {list.length === 0 && (
        <div className="no-items-message">No {title.toLowerCase()} found</div>
      )}
    </div>
  );
};

export default Pagination;
