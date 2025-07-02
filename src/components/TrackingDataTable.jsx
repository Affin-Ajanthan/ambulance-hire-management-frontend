import React, { useEffect, useState } from "react";
import "../assets/css/dataTable.css";
import DesktopTableView from "./DesktopTableView";
import MobileTableView from "./MobileTableView";
import TableViewFilters from "./TableViewFilters";

const TrackingDataTable = () => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editData, setEditData] = useState({});

  const statuses = ["COMPLETED", "CANCELED", "CREATED", "STARTED", "ENDED"];
  const drivers = ["John Silva", "Priya Fernando", "Kasun Perera"];

  const sample_list = [
    {
      id: 1,
      name: "Test 1",
      date: "2025-06-30",
      pickup: "Colombo Fort",
      destination: "Kandy",
      amount: 1500,
      status: "COMPLETED",
      driver: "John Silva",
    },
    {
      id: 2,
      name: "Test 2",
      date: "2025-06-29",
      pickup: "Negombo",
      destination: "Galle",
      amount: 800,
      status: "STARTED",
      driver: "Priya Fernando",
    },
    {
      id: 3,
      name: "Test 3",
      date: "2025-06-28",
      pickup: "Puttalam",
      destination: "Anuradhapura",
      amount: 2200,
      status: "CREATED",
      driver: "Kasun Perera",
    },
    {
      id: 4,
      name: "Test 4",
      date: "2025-06-27",
      pickup: "Mount Lavinia",
      destination: "Jaffna",
      amount: 3500,
      status: "CANCELED",
      driver: "John Silva",
    },
    {
      id: 5,
      name: "Test 4",
      date: "2025-06-26",
      pickup: "Kurunegala",
      destination: "Ratnapura",
      amount: 1200,
      status: "ENDED",
      driver: "Priya Fernando",
    },
    {
      id: 6,
      name: "Test 5",
      date: "2025-07-01",
      pickup: "Colombo",
      destination: "Matara",
      amount: 950,
      status: "STARTED",
      driver: "Kasun Perera",
    },
  ];

  useEffect(() => {
    setList(sample_list);
    setFilteredList(sample_list);
  }, []);

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: "4px 12px",
      borderRadius: "16px",
      fontSize: "12px",
      fontWeight: "500",
      display: "inline-block",
      textAlign: "center",
      minWidth: "80px",
      cursor: "pointer",
    };

    switch (status) {
      case "COMPLETED":
        return { ...baseStyle, backgroundColor: "#dcfce7", color: "#166534" };
      case "CANCELED":
        return { ...baseStyle, backgroundColor: "#fecaca", color: "#dc2626" };
      case "CREATED":
        return { ...baseStyle, backgroundColor: "#dbeafe", color: "#1d4ed8" };
      case "STARTED":
        return { ...baseStyle, backgroundColor: "#fed7aa", color: "#ea580c" };
      case "ENDED":
        return { ...baseStyle, backgroundColor: "#e0e7ff", color: "#4338ca" };
      default:
        return { ...baseStyle, backgroundColor: "#f3f4f6", color: "#374151" };
    }
  };

  const StatusTag = ({ status }) => (
    <span style={getStatusStyle(status)}>{status}</span>
  );

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(amount);

  const startEdit = (rowData, index) => {
    setEditingRow(index);
    setEditData({ ...rowData });
  };

  const saveEdit = (index) => {
    const newList = [...list];
    const originalIndex = list.findIndex(
      (item) => item.id === filteredList[index].id
    );
    newList[originalIndex] = editData;
    setList(newList);
    setEditingRow(null);
    setEditData({});
  };

  const cancelEdit = () => {
    setEditingRow(null);
    setEditData({});
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const allowEdit = (rowData) => rowData.name !== "Blue Band";

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container">
        <TableViewFilters
          filteredList={filteredList}
          drivers={drivers}
          statuses={statuses}
          setFilteredList={setFilteredList}
          list={list}
        />

        <DesktopTableView
          filteredList={filteredList}
          editingRow={editingRow}
          handleInputChange={handleInputChange}
          editData={editData}
          drivers={drivers}
          formatCurrency={formatCurrency}
          statuses={statuses}
          getStatusStyle={getStatusStyle}
          allowEdit={allowEdit}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          startEdit={startEdit}
          StatusTag={StatusTag}
        />

        <MobileTableView
          filteredList={filteredList}
          editingRow={editingRow}
          handleInputChange={handleInputChange}
          editData={editData}
          drivers={drivers}
          formatCurrency={formatCurrency}
          statuses={statuses}
          getStatusStyle={getStatusStyle}
          allowEdit={allowEdit}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          startEdit={startEdit}
          StatusTag={StatusTag}
        />
      </div>
    </div>
  );
};

export default TrackingDataTable;
