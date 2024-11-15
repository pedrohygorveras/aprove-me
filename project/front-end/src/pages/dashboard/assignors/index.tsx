import { Header } from "@/components/header";
import { DashboardLayout } from "@/components/layouts/dashboard";
import { Content } from "@/components/content";
// import TablePage from "./table";

const Assignors: React.FC = () => {
  const urlAssignorCreate = "/dashboard/assignors/add";

  return (
    <DashboardLayout>
      <Content
        className="min-h-[calc(100vh_-_80px)]"
        urlCreate={urlAssignorCreate}
      >
        <Header title="Cedentes:" />

        <div className="py-8">{/* <TablePage data={data} /> */}</div>
      </Content>
    </DashboardLayout>
  );
};

export { Assignors };
