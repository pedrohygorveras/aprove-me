import { Header } from "@/components/header";
import { DashboardLayout } from "@/components/layouts/dashboard";

const Users: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="page">
        <Header title="Usuários:" />
      </div>
    </DashboardLayout>
  );
};

export default Users;
