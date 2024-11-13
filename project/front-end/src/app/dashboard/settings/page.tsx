import { Header } from "@/components/header";
import { DashboardLayout } from "@/components/layouts/dashboard";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="page">
        <Header title="Configurações:" />
      </div>
    </DashboardLayout>
  );
}
