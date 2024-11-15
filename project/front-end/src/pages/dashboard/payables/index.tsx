import { Header } from "@/components/header";
import { DashboardLayout } from "@/components/layouts/dashboard";
import { Content } from "@/components/content";
import { useEffect, useState } from "react";
import { payableService } from "@/services/payable";
import { getErrorMessage } from "@/util/erros";
import { Table } from "@/components/table";
import { columns } from "./table/columns";
import { TableRow } from "./table/row";
import { FaFile } from "react-icons/fa";
import { Loading } from "@/components/loading";
import { TablePagination } from "@/components/table/pagination";
import { TableSearch } from "@/components/table/search";

const Payables: React.FC = () => {
  const urlPayableCreate = "/dashboard/payables/add";

  const [payables, setPayables] = useState<any[] | null>(null);
  const [payablesQtd, setPayablesQtd] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(30);
  const [search, setSearch] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadPayables = async () => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const result = await payableService.getPayables(page, limit, search);
      if (result.error) {
        setErrorMessage(getErrorMessage(result.statusCode));
        setPayables(null);
        return;
      }

      const { data, total } = result;

      setPayables(data);
      setPayablesQtd(total);
    } catch (error: any) {
      setErrorMessage(getErrorMessage(error.statusCode));
      setPayables(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPayables();
  }, [page, search]);

  const handleNext = () => {
    if (page < Math.ceil(payablesQtd / limit)) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <DashboardLayout>
      <Content
        className="min-h-[calc(100vh_-_80px)]"
        urlCreate={urlPayableCreate}
        batch={true}
      >
        <Header title="Pagamentos:" />

        <div className="py-8">
          <TableSearch search={search} setSearch={setSearch} />
          <div className="w mb-8 mt-6 flex justify-end md:min-w-[225px]">
            <TablePagination
              currentPage={page}
              totalPages={Math.ceil(payablesQtd / limit)}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          </div>

          {errorMessage ? (
            <div role="alert" className="alert alert-warning bg-red-100">
              <span className="text-sm font-semibold">{errorMessage}</span>
            </div>
          ) : isLoading ? (
            <Loading />
          ) : payables && payables.length > 0 ? (
            <Table columns={columns} data={payables} Row={TableRow} />
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <FaFile className="mb-5 text-5xl" />
              <h3 className="text-xl font-semibold">
                Nenhum registro encontrado.
              </h3>
            </div>
          )}
          <div className="w mt-8 flex justify-center md:min-w-[225px]">
            <TablePagination
              currentPage={page}
              totalPages={Math.ceil(payablesQtd / limit)}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          </div>
        </div>
      </Content>
    </DashboardLayout>
  );
};

export { Payables };
