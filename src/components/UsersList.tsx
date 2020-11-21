import React from "react";
import { User } from "../model/User";
import { Avatar, List } from "antd";

interface Props {
  users?: User[];
}

const UsersList = ({ users }: Props) => (
  <List
    dataSource={users}
    renderItem={(user) => (
      <List.Item>
        <List.Item.Meta avatar={<Avatar src={user.avatarUrl} />} title={user.login}/>
      </List.Item>
    )}
  />
);

export default UsersList;
