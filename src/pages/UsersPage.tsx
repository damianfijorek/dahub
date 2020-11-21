import React, { useEffect, useState } from "react";
import { message } from "antd";
import Api, { isFailure } from "../services/Api";
import { User } from "../model/User";
import UsersList from "../components/UsersList";

const UsersPage = () => {
  const [users, setUsers] = useState<User[] | undefined>(undefined);

  useEffect(() => {
    let didCancel = false;

    (async () => {
      var result = await Api.getUsers();
      if (didCancel) return;

      if (isFailure(result)) {
        message.error(result.message);
        setUsers(undefined);
      }
      else {
        setUsers(result.map((r) => ({ id: r.id, login: r.login, avatarUrl: r.avatar_url })))
      };
    })();

    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <>
      <h1>GitHub users</h1>
      <UsersList users={users} />
    </>
  );
};

export default UsersPage;
