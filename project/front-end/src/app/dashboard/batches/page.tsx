import { Header } from "@/components/header";
import { DashboardLayout } from "@/components/layouts/dashboard";

const Batches: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="page">
        <Header title="Lotes:" />
      </div>
    </DashboardLayout>
  );
};

export default Batches;
