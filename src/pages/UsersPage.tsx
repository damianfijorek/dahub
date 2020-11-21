import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { message, Pagination } from "antd";
import AppState from "../store/state";
import { setPage, setPageSize } from "../store/actions";
import Api, { isFailure } from "../services/Api";
import { User } from "../model/User";
import UsersList from "../components/UsersList";

interface State {
  currentUsers: User[] | undefined;
  pages: number;
}

const mapStateToProps = (appState: AppState) => appState.pagerState;

const mapDispatchToProps = () => ({ setPage, setPageSize });

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const empty: State = { currentUsers: undefined, pages: 1 };

const UsersPage = (props: Props) => {
  const [state, setState] = useState(empty);
  const { page, setPage, pageSize, setPageSize } = props;

  const onPageSizeChange = useCallback((_, pageSize) => setPageSize(pageSize), [setPageSize]);

  useEffect(() => {
    let didCancel = false;

    (async () => {
      var result = await Api.getUsers(page, pageSize);
      if (didCancel) return;

      if (isFailure(result)) {
        message.error(result.message);
        setState(empty);
      } else {
        setState({
          currentUsers: result.users.map((r) => ({ id: r.id, login: r.login, avatarUrl: r.avatar_url })),
          pages: result.pages.last?.page ?? page,
        });
      }
    })();

    return () => {
      didCancel = true;
    };
  }, [page, pageSize]);

  return (
    <>
      <h1>GitHub users</h1>
      {state.currentUsers && (
        <>
          <UsersList users={state.currentUsers} />
          <Pagination
            responsive
            size="small"
            current={page}
            onChange={setPage}
            pageSize={pageSize}
            pageSizeOptions={["10", "20", "50"]}
            onShowSizeChange={onPageSizeChange}
            total={state.pages * pageSize}
          />
        </>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps())(UsersPage);
