import React from "react";
import CustomDropdown from "./DropDown";
import { Edit2, Check, X } from "lucide-react";

const DesktopTableView = ({
  filteredList,
  editingRow,
  handleInputChange,
  editData,
  drivers,
  formatCurrency,
  statuses,
  getStatusStyle,
  StatusTag,
  allowEdit,
  saveEdit,
  cancelEdit,
  startEdit,
}) => {
  return (
    <div className="desktop-view">
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Pickup</th>
              <th>Destination</th>
              <th>Driver</th>
              <th>Amount</th>
              <th>Status</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((row, index) => (
              <tr key={row.id || index}>
                <td>
                  {editingRow === index ? (
                    <input
                      type="text"
                      value={editData.name || ""}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  ) : (
                    row.name
                  )}
                </td>
                <td>
                  {editingRow === index ? (
                    <input
                      type="date"
                      value={editData.date || ""}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                    />
                  ) : (
                    row.date
                  )}
                </td>
                <td>
                  {editingRow === index ? (
                    <input
                      type="text"
                      value={editData.pickup || ""}
                      onChange={(e) =>
                        handleInputChange("pickup", e.target.value)
                      }
                    />
                  ) : (
                    row.pickup
                  )}
                </td>
                <td>
                  {editingRow === index ? (
                    <input
                      type="text"
                      value={editData.destination || ""}
                      onChange={(e) =>
                        handleInputChange("destination", e.target.value)
                      }
                    />
                  ) : (
                    row.destination
                  )}
                </td>
                <td>
                  {editingRow === index ? (
                    <CustomDropdown
                      options={drivers}
                      value={editData.driver || ""}
                      onChange={(value) => handleInputChange("driver", value)}
                    />
                  ) : (
                    row.driver
                  )}
                </td>
                <td>
                  {editingRow === index ? (
                    <input
                      type="number"
                      value={editData.amount || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "amount",
                          parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  ) : (
                    formatCurrency(row.amount)
                  )}
                </td>
                <td>
                  {editingRow === index ? (
                    <CustomDropdown
                      options={statuses}
                      value={editData.status || ""}
                      onChange={(value) => handleInputChange("status", value)}
                      getStyle={getStatusStyle}
                    />
                  ) : (
                    <StatusTag status={row.status} />
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  {allowEdit(row) && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      {editingRow === index ? (
                        <>
                          <button
                            onClick={() => saveEdit(index)}
                            className="button-save"
                          >
                            <Check size={16} />
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="button-cancel"
                          >
                            <X size={16} />
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => startEdit(row, index)}
                          className="button-edit"
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DesktopTableView;
