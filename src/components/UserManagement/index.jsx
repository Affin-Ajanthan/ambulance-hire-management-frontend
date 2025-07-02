import React, { useEffect, useMemo, useState } from "react";
import "../../assets/css/userStyle.css"; // Import your custom styles
import UserList from "./UserList";
import Pagination from "../Elements/Pagination";

const Users = () => {
  const sampleData = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: ["Admin", "Staff", "Driver"][i % 3],
        joinDate: new Date(
          2020 + (i % 4),
          i % 12,
          (i % 28) + 1
        ).toLocaleDateString(),
      })),
    []
  );
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(sampleData);
  }, []);

  return (
    <Pagination list={list} title="User Records" listName="list">
      <UserList />
    </Pagination>
  );
};

export default Users;
