import { Header } from "@/components/header";
import { DashboardLayout } from "@/components/layouts/dashboard";
import { Content } from "@/components/content";
import { useEffect, useState } from "react";
import { assignorService } from "@/services/assignor";
import { getErrorMessage } from "@/util/erros";
import { Table } from "@/components/table";
import { columns } from "./table/columns";
import { TableRow } from "./table/row";
import { FaFile } from "react-icons/fa";
import { Loading } from "@/components/loading";
import { TablePagination } from "@/components/table/pagination";
import { TableSearch } from "@/components/table/search";

const Assignors: React.FC = () => {
  const urlAssignorCreate = "/dashboard/assignors/add";

  const [assignors, setAssignors] = useState<any[] | null>(null);
  const [assignorsQtd, setAssignorsQtd] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(30);
  const [search, setSearch] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadAssignors = async () => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const result = await assignorService.getAssignors(page, limit, search);
      if (result.error) {
        setErrorMessage(getErrorMessage(result.statusCode));
        setAssignors(null);
        return;
      }

      const { data, total } = result;

      setAssignors(data);
      setAssignorsQtd(total);
    } catch (error: any) {
      setErrorMessage(getErrorMessage(error.statusCode));
      setAssignors(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAssignors();
  }, [page, search]);

  const handleNext = () => {
    if (page < Math.ceil(assignorsQtd / limit)) {
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
        urlCreate={urlAssignorCreate}
      >
        <Header title="Cedentes:" />

        <div className="py-8">
          <TableSearch search={search} setSearch={setSearch} />
          <div className="w mb-8 mt-6 flex justify-end md:min-w-[225px]">
            <TablePagination
              currentPage={page}
              totalPages={Math.ceil(assignorsQtd / limit)}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          </div>

          {errorMessage ? (
            <div role="alert" className="alert alert-warning bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="text-sm font-semibold">{errorMessage}</span>
            </div>
          ) : isLoading ? (
            <Loading />
          ) : assignors && assignors.length > 0 ? (
            <Table columns={columns} data={assignors} Row={TableRow} />
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
              totalPages={Math.ceil(assignorsQtd / limit)}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          </div>
        </div>
      </Content>
    </DashboardLayout>
  );
};

export { Assignors };
