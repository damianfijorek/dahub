import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Empty, Spin } from "antd";
import Api, { Failure, isFailure } from "../../services/Api";
import { UserDetails } from "../../model/User";
import styles from "./styles.module.css";
import UserCard from "../../components/UserCard";

interface Loading {
  loading: true;
}

const Page = (props: RouteComponentProps<{ login: string }>) => {
  const login = props.match.params.login;
  const [state, setState] = useState<Loading | UserDetails | Failure>({ loading: true });

  useEffect(() => {
    let didCancel = false;

    (async () => {
      var result = await Api.getUser(login);
      if (didCancel) return;
      if (isFailure(result)) {
        setState(result);
      } else {
        setState({
          id: result.id,
          login: result.login,
          avatarUrl: result.avatar_url,
          name: result.name,
          email: result.email,
          location: result.location,
        });
      }
    })();

    return () => {
      didCancel = true;
    };
  }, [login]);

  return (
    <div className={styles.details}>
      {isFailure(state) ? (
        <Empty  description={state.message} />
      ) : "loading" in state ? (
        <Spin size="large" />
      ) : (
        <UserCard user={state} />
      )}
    </div>
  );
};

const UserDetailsPage = withRouter(Page);
export default UserDetailsPage;
