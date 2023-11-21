"use client";

import { getAllUsers } from "@/src/app/api/user";
import LoadingModal from "@/src/components/UI/LoadingModal";
import AdminSearchBar from "@/src/components/admin/AdminSearchBar";
import AdminUserList from "@/src/components/admin/user/AdminUserList";
import NotFound from "@/src/app/not-found";
import { User } from "@/src/types";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

const AdminUserClient = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => getAllUsers(1, 30),
  });

  if (isLoading) {
    return <LoadingModal />;
  }

  if (isError) {
    return <NotFound />;
  }

  if (!users) {
    return <NotFound />;
  }

  return (
    <PanelContainer>
      <PanelHeaderArea>
        <AdminSearchBar />
      </PanelHeaderArea>
      <PanelTitle>
        <h1>유저</h1>
        <span>({users.length})</span>
      </PanelTitle>
      <AdminUserList users={users} />
    </PanelContainer>
  );
};

export default AdminUserClient;

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PanelHeaderArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  background-color: white;
  height: 8rem;
  padding: 0 3rem;
`;

const PanelProfileBox = styled.div``;

const PanelTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3rem;

  h1 {
    font-size: 20px;
  }

  span {
    font-size: 18px;
    font-weight: 500;
  }
`;
