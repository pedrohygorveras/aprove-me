/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";

import { Header } from "@/components/header";
import { DashboardLayout } from "@/components/layouts/dashboard";
import { Content } from "@/components/content";
import { Form } from "@/components/form";
import { Assignors } from "@/services/assignors";
import { fields } from "./fields";
import { schema } from "./schema";

const AssignorsForm: React.FC = () => {
  const onSubmit = async (data: any) => {
    try {
      const assignorsService = new Assignors();
      await assignorsService.create(data);
    } catch (error) {
      console.error("Error on form submit:", error);
    }
  };

  return (
    <DashboardLayout>
      <Content className="min-h-[calc(100vh_-_80px)]">
        <Header title="Cedentes:" goBack="/dashboard/assignors" />
        <div className="py-8">
          <Form fields={fields} schema={schema} onSubmit={onSubmit} />
        </div>
      </Content>
    </DashboardLayout>
  );
};

export default AssignorsForm;
