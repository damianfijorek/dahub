import React, { useCallback, useEffect, useState } from "react";
import { message, Pagination } from "antd";
import Api, { isFailure } from "../services/Api";
import { User } from "../model/User";
import UsersList from "../components/UsersList";

interface State {
  currentUsers: User[] | undefined;
  pages: number;
}

interface PagerState {
  page: number;
  pageSize: number;
}

const empty: State = { currentUsers: undefined, pages: 1 };

const UsersPage = () => {
  const [state, setState] = useState(empty);
  const [pagerState, setPagerState] = useState<PagerState>({ page: 1, pageSize: 10 });

  const onPageChange = useCallback((page: number) => setPagerState((x) => ({ ...x, page })), [setPagerState]);
  const onPageSizeChange = useCallback(
    (_: number, pageSize: number) => {
      setPagerState({ page: 1, pageSize: pageSize });
    },
    [setPagerState]
  );

  useEffect(() => {
    let didCancel = false;

    (async () => {
      var result = await Api.getUsers(pagerState.page, pagerState.pageSize);
      if (didCancel) return;

      if (isFailure(result)) {
        message.error(result.message);
        setState(empty);
      } else {
        setState({
          currentUsers: result.users.map((r) => ({ id: r.id, login: r.login, avatarUrl: r.avatar_url })),
          pages: result.pages.last?.page ?? pagerState.page,
        });
      }
    })();

    return () => {
      didCancel = true;
    };
  }, [pagerState]);

  return (
    <>
      <h1>GitHub users</h1>
      <UsersList users={state.currentUsers} />
      <Pagination
        responsive
        size="small"
        current={pagerState.page}
        onChange={onPageChange}
        pageSize={pagerState.pageSize}
        pageSizeOptions={["10", "20", "50"]}
        onShowSizeChange={onPageSizeChange}
        total={state.pages * pagerState.pageSize}
      />
    </>
  );
};

export default UsersPage;
