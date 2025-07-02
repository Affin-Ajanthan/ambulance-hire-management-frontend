import React, { useEffect, useState } from "react";
import CustomDropdown from "../Elements/DropDown";
import { Search, Filter } from "lucide-react";

const TableViewFilters = ({
  filteredList,
  drivers,
  statuses,
  setFilteredList,
  list,
}) => {
  const [searchName, setSearchName] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [driverFilter, setDriverFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let filtered = [...list];

    // Search by name
    if (searchName) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    // Filter by driver
    if (driverFilter) {
      filtered = filtered.filter((item) => item.driver === driverFilter);
    }

    // Filter by date range
    if (dateFrom) {
      filtered = filtered.filter((item) => item.date >= dateFrom);
    }
    if (dateTo) {
      filtered = filtered.filter((item) => item.date <= dateTo);
    }

    setFilteredList(filtered);
  }, [list, searchName, statusFilter, driverFilter, dateFrom, dateTo]);

  const clearFilters = () => {
    setSearchName("");
    setStatusFilter("");
    setDriverFilter("");
    setDateFrom("");
    setDateTo("");
  };

  return (
    <>
      <div className="filters-section">
        <div className="filters-header">
          <button
            className="filters-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          {(searchName ||
            statusFilter ||
            driverFilter ||
            dateFrom ||
            dateTo) && (
            <button className="clear-filters" onClick={clearFilters}>
              Clear All Filters
            </button>
          )}
        </div>

        {showFilters && (
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">Search by Name</label>
              <div className="customer-name-search">
                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                  }}
                />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search Customers..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  style={{ paddingLeft: "36px" }}
                />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Status</label>
              <CustomDropdown
                options={["", ...statuses]}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder="All Statuses"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Driver</label>
              <CustomDropdown
                options={["", ...drivers]}
                value={driverFilter}
                onChange={setDriverFilter}
                placeholder="All Drivers"
              />
            </div>

            <div className="filter-group input-class">
              <label className="filter-label">Date From</label>
              <input
                type="date"
                className="date-input"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>

            <div className="filter-group input-class">
              <label className="filter-label">Date To</label>
              <input
                type="date"
                className="date-input"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      <div className="results-count">
        Showing {filteredList.length} of {list.length} deliveries
      </div>
    </>
  );
};

export default TableViewFilters;
