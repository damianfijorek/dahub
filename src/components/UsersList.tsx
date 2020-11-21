import React from "react";
import { Link } from "react-router-dom";
import { User } from "../model/User";
import { Avatar, List } from "antd";

interface Props {
  users?: User[];
}

const UsersList = ({ users }: Props) => (
  <List
    dataSource={users}
    renderItem={(user) => (
      <List.Item key={user.id}>
        <Link to={`/user/${user.login}`}>
          <List.Item.Meta avatar={<Avatar src={user.avatarUrl} />} title={user.login} />
        </Link>
      </List.Item>
    )}
  />
);

export default UsersList;
