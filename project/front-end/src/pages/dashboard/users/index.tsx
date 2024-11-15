import { Header } from "@/components/header";
import { DashboardLayout } from "@/components/layouts/dashboard";
import { Content } from "@/components/content";
import { useEffect, useState } from "react";
import { userService } from "@/services/user";
import { getErrorMessage } from "@/util/erros";
import { Table } from "@/components/table";
import { columns } from "./table/columns";
import { TableRow } from "./table/row";
import { FaFile } from "react-icons/fa";
import { Loading } from "@/components/loading";
import { TablePagination } from "@/components/table/pagination";
import { TableSearch } from "@/components/table/search";

const Users: React.FC = () => {
  const urlUserCreate = "/dashboard/users/add";

  const [users, setUsers] = useState<any[] | null>(null);
  const [usersQtd, setUsersQtd] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(30);
  const [search, setSearch] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadUsers = async () => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const result = await userService.getUsers(search, page, limit);
      if (result.error) {
        setErrorMessage(getErrorMessage(result.statusCode));
        setUsers(null);
        return;
      }

      const { data, total } = result;

      setUsers(data);
      setUsersQtd(total);
    } catch (error: any) {
      setErrorMessage(getErrorMessage(error.statusCode));
      setUsers(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, search]);

  const handleNext = () => {
    if (page < Math.ceil(usersQtd / limit)) {
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
      <Content className="min-h-[calc(100vh_-_80px)]" urlCreate={urlUserCreate}>
        <Header title="Users:" />

        <div className="py-8">
          <TableSearch search={search} setSearch={setSearch} />
          <div className="w mb-8 mt-6 flex justify-end md:min-w-[225px]">
            <TablePagination
              currentPage={page}
              totalPages={Math.ceil(usersQtd / limit)}
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
          ) : users && users.length > 0 ? (
            <Table columns={columns} data={users} Row={TableRow} />
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
              totalPages={Math.ceil(usersQtd / limit)}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          </div>
        </div>
      </Content>
    </DashboardLayout>
  );
};

export { Users };