import { Header } from "@/components/header";
import { DashboardLayout } from "@/components/layouts/dashboard";

const Payables: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="page">
        <Header title="Pagamentos:" />
      </div>
    </DashboardLayout>
  );
};

export default Payables;
