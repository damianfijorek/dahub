import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Space, Typography } from "antd";
import { ArrowLeftOutlined, EnvironmentTwoTone, MailTwoTone } from "@ant-design/icons";
import { UserDetails } from "../model/User";

const { Text, Title } = Typography;

interface Props {
  user: UserDetails;
}

const UsersComponent = ({ user }: Props) => (
  <Card
    cover={<img alt="" src={user.avatarUrl} />}
    actions={[
      <Link to="/">
        <Button type="primary" icon={<ArrowLeftOutlined />}>
            Back
        </Button>
      </Link>,
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
          <MailTwoTone /> <Typography.Link href={`mailto:${user.email}`}>{user.email}</Typography.Link>
        </Text>
      )}
    </Space>
  </Card>
);

export default UsersComponent;
