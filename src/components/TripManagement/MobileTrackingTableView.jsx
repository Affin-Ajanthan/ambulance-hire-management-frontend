import React from "react";
import CustomDropdown from "../Elements/DropDown";
import { Edit2, Check, X } from "lucide-react";

const MobileTrackingTableView = ({
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
    <div className="mobile-view">
      {filteredList.map((row, index) => (
        <div key={row.id || index} className="card">
          <div className="card-header">
            <div style={{ flex: 1 }}>
              <h3 className="card-title input-class">
                {editingRow === index ? (
                  <input
                    type="text"
                    value={editData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                ) : (
                  row.name
                )}
              </h3>
              <p className="card-date input-class">
                {editingRow === index ? (
                  <input
                    type="date"
                    value={editData.date || ""}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                ) : (
                  row.date
                )}
              </p>
            </div>
            <div style={{ marginLeft: "12px", paddingLeft: "10px" }}>
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
            </div>
          </div>

          <div>
            <div className="card-row">
              <span className="card-label">Pickup:</span>
              <span className="card-value input-class">
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
              </span>
            </div>
            <div className="card-row">
              <span className="card-label">Destination:</span>
              <span className="card-value input-class">
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
              </span>
            </div>
            <div className="card-row">
              <span className="card-label">Driver:</span>
              <span className="card-value">
                {editingRow === index ? (
                  <CustomDropdown
                    options={drivers}
                    value={editData.driver || ""}
                    onChange={(value) => handleInputChange("driver", value)}
                  />
                ) : (
                  row.driver
                )}
              </span>
            </div>
            <div
              className="card-row"
              style={{ borderBottom: "none", paddingTop: "12px" }}
            >
              <span className="card-label">Amount:</span>
              <span className="card-value card-amount input-class">
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
              </span>
            </div>
          </div>

          {allowEdit(row) && (
            <div className="card-actions">
              {editingRow === index ? (
                <>
                  <button
                    onClick={() => saveEdit(index)}
                    className="button-save"
                  >
                    <Check size={16} />
                    Save
                  </button>
                  <button onClick={cancelEdit} className="button-cancel">
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
        </div>
      ))}
    </div>
  );
};

export default MobileTrackingTableView;
