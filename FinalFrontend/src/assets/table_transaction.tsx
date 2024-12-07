import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X, Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface TableData {
  date: string;
  company: string;
  status: "completed" | "failed" | "processing";
  id: string;
  credits: number;
  amount: string;
}

const DynamicTable: React.FC<{ data: TableData[] }> = ({ data }) => {
  const getStatusIcon = (status: TableData["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="w-5 h-5 text-green-500" />;
      case "failed":
        return <X className="w-5 h-5 text-red-500" />;
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow className="gap-10 align-center ">
              <TableHead className="font-bold  display-flex justify-center">
                Date
              </TableHead>
              <TableHead className="font-bold  display-flex justify-center">
                Company
              </TableHead>
              <TableHead className="font-bold  display-flex justify-center">
                Status
              </TableHead>
              <TableHead className="font-bold  display-flex justify-center">
                ID
              </TableHead>
              <TableHead className="font-bold display-flex justify-center text-right">
                Credits
              </TableHead>
              <TableHead className="font-bold text-right display-flex justify-center">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="text-gray-500 flex-col align-center justify-center ">
                  {row.date}
                </TableCell>
                <TableCell className="flex-col align-center justify-center">
                  {row.company}
                </TableCell>
                <TableCell className="flex-col align-center justify-center">
                  {getStatusIcon(row.status)}
                </TableCell>
                <TableCell className="text-blue-500 flex-col align-center justify-center">
                  {row.id}
                </TableCell>
                <TableCell className="text-right flex-col align-center justify-center">
                  {row.credits}
                </TableCell>
                <TableCell className="text-right flex-col align-center justify-center">
                  {row.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

interface TablePageProps {
  sortOption: string;
}

export default function TablePage({ sortOption }: TablePageProps) {
  const [sortedData, setSortedData] = useState<TableData[]>([]);

  // This would typically come from an API or props
  const mockData: TableData[] = [
    {
      date: "11/04/2024",
      company: "Nike",
      status: "completed",
      id: "567779AB",
      credits: 1000,
      amount: `INR ${(1000 * 14.5).toLocaleString()}`,
    },
    {
      date: "15/04/2024",
      company: "Adidas",
      status: "failed",
      id: "789012CD",
      credits: 1500,
      amount: `INR ${(1500 * 14.5).toLocaleString()}`,
    },
    {
      date: "20/04/2024",
      company: "Puma",
      status: "processing",
      id: "345678EF",
      credits: 750,
      amount: `INR ${(750 * 14.5).toLocaleString()}`,
    },
    {
      date: "25/04/2024",
      company: "Reebok",
      status: "completed",
      id: "901234GH",
      credits: 2000,
      amount: `INR ${(2000 * 14.5).toLocaleString()}`,
    },
    {
      date: "30/04/2024",
      company: "Under Armour",
      status: "completed",
      id: "123456IJ",
      credits: 1200,
      amount: `INR ${(1200 * 14.5).toLocaleString()}`,
    },
    {
      date: "05/05/2024",
      company: "New Balance",
      status: "processing",
      id: "234567KL",
      credits: 800,
      amount: `INR ${(800 * 14.5).toLocaleString()}`,
    },
    {
      date: "10/05/2024",
      company: "Asics",
      status: "failed",
      id: "345678MN",
      credits: 1800,
      amount: `INR ${(1800 * 14.5).toLocaleString()}`,
    },
    {
      date: "15/05/2024",
      company: "Converse",
      status: "completed",
      id: "456789OP",
      credits: 600,
      amount: `INR ${(600 * 14.5).toLocaleString()}`,
    },
    {
      date: "20/05/2024",
      company: "Vans",
      status: "processing",
      id: "567890QR",
      credits: 950,
      amount: `INR ${(950 * 14.5).toLocaleString()}`,
    },
    {
      date: "25/05/2024",
      company: "Skechers",
      status: "completed",
      id: "678901ST",
      credits: 1300,
      amount: `INR ${(1300 * 14.5).toLocaleString()}`,
    },
    {
      date: "30/05/2024",
      company: "Fila",
      status: "failed",
      id: "789012UV",
      credits: 700,
      amount: `INR ${(700 * 14.5).toLocaleString()}`,
    },
    {
      date: "04/06/2024",
      company: "Brooks",
      status: "completed",
      id: "890123WX",
      credits: 1100,
      amount: `INR ${(1100 * 14.5).toLocaleString()}`,
    },
    {
      date: "09/06/2024",
      company: "Mizuno",
      status: "processing",
      id: "901234YZ",
      credits: 1600,
      amount: `INR ${(1600 * 14.5).toLocaleString()}`,
    },
    {
      date: "14/06/2024",
      company: "Salomon",
      status: "completed",
      id: "012345AB",
      credits: 850,
      amount: `INR ${(850 * 14.5).toLocaleString()}`,
    },
  ];

  useEffect(() => {
    const sortData = (data: TableData[], option: string) => {
      const sorted = [...data];
      switch (option) {
        case 'date_asc':
          return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        case 'date_desc':
          return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        case 'company_asc':
          return sorted.sort((a, b) => a.company.localeCompare(b.company));
        case 'company_desc':
          return sorted.sort((a, b) => b.company.localeCompare(a.company));
        case 'credits_asc':
          return sorted.sort((a, b) => a.credits - b.credits);
        case 'credits_desc':
          return sorted.sort((a, b) => b.credits - a.credits);
        case 'amount_asc':
          return sorted.sort((a, b) => parseFloat(a.amount.replace(/[^0-9.-]+/g, "")) - parseFloat(b.amount.replace(/[^0-9.-]+/g, "")));
        case 'amount_desc':
          return sorted.sort((a, b) => parseFloat(b.amount.replace(/[^0-9.-]+/g, "")) - parseFloat(a.amount.replace(/[^0-9.-]+/g, "")));
        default:
          return data;
      }
    };

    setSortedData(sortData(mockData, sortOption));
  }, [sortOption]);

  return <DynamicTable data={sortedData} />;
}
