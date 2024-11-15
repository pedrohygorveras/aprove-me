"use client";

interface TableRowProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  createdAt: string;
  updated: string;
}

const TableRow: React.FC<{ row: TableRowProps }> = ({ row }) => (
  <tr key={row.id}>
    <td className="border py-2 text-left px-2">{row.name}</td>
    <td className="border py-2 text-left px-2">{row.email}</td>
    <td className="border py-2 text-left px-2">{row.phone}</td>
    <td className="border py-2 text-left px-2">{row.document}</td>
    <td className="border py-2 text-left px-2">{row.createdAt}</td>
    <td className="border py-2 text-left px-2 max-w-24 w-24"></td>
  </tr>
);

export { TableRow };
