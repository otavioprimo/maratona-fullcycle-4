import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import "./style.css";

const API_URL = "https://reqres.in/api/users";

interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IUser[];
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPages, setMaxPages] = useState<number>(0);

  const getUsers = useCallback(async () => {
    const response = await axios.get(`${API_URL}?page=${page}`);
    const data: UserApiResponse = response.data;

    setMaxPages(data.total_pages);

    setUsers(data.data);
  }, [page]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const renderPagination = () => {
    const pages: number[] = [];
    for (let i = 1; i <= maxPages; i++) {
      pages.push(i);
    }

    return pages.map((page) => {
      if (page === 0) return <></>;

      return (
        <button key={String(page)} onClick={() => setPage(page)}>
          {page}
        </button>
      );
    });
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Email</th>
            <th>First name</th>
            <th>Last name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img src={user.avatar} alt="user-avatar" className="avatar" />
              </td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="container-pagination">{renderPagination()}</div>
    </>
  );
};

export default Users;
