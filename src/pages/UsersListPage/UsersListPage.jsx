import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { UsersList } from "../../components/UsersList/UsersList";
import { Navigate } from "react-router-dom";

const UsersListPage = () => {
  const { user } = useContext(AuthContext);

  if (!user || !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <UsersList />
    </div>
  );
};

export { UsersListPage };
