import { Header } from "@/components/header";
import { DashboardLayout } from "@/components/layouts/dashboard";

const DeadLetterQueue: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="page">
        <Header title="Fila Morta:" />
      </div>
    </DashboardLayout>
  );
};

export default DeadLetterQueue;
