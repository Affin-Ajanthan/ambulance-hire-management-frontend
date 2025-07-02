import React, { useEffect, useState, useRef } from "react";
import { Edit2, Check, X, ChevronDown } from "lucide-react";

const CustomDropdown = ({
  options,
  value,
  onChange,
  getStyle,
  placeholder = "Select...",
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div
        className={`dropdown-trigger ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        style={getStyle ? getStyle(value) : {}}
      >
        {value || placeholder}
        <ChevronDown
          size={16}
          className={`dropdown-arrow ${isOpen ? "open" : ""}`}
        />
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option}
              className="dropdown-item"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
