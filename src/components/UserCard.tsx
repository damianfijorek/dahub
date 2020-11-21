import React from "react";
import { Button, Card, Space, Typography } from "antd";
import { ArrowLeftOutlined, EnvironmentTwoTone, MailTwoTone } from "@ant-design/icons";
import { UserDetails } from "../model/User";

const { Link, Text, Title } = Typography;

interface Props {
  user: UserDetails;
}

const UsersComponent = ({ user }: Props) => (
  <Card
    cover={<img alt="" src={user.avatarUrl} />}
    actions={[
      <Button type="primary" icon={<ArrowLeftOutlined />} href="/">
        Back
      </Button>,
    ]}
  >
    <Space direction="vertical">
      <Title>{user.name}</Title>
      <Text type="secondary">{user.login}</Text>
      {user.location && (
        <Text>
          <EnvironmentTwoTone /> {user.location}
        </Text>
      )}
      {user.email && (
        <Text>
          <MailTwoTone /> <Link href={`mailto:${user.email}`}>{user.email}</Link>
        </Text>
      )}
    </Space>
  </Card>
);

export default UsersComponent;
