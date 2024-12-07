"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface TableData {
  date: string;
  contracter: string;
  status: "accepted" | "rejected";
  id: string;
  credits: number;
  amount: string;
}

const DynamicTable: React.FC<{ data: TableData[] }> = ({ data }) => {
  const getStatusBadge = (status: TableData["status"]) => {
    switch (status) {
      case "accepted":
        return <Badge variant="success"><Check className="w-4 h-4 mr-1" /> Accepted</Badge>;
      case "rejected":
        return <Badge variant="destructive"><X className="w-4 h-4 mr-1" /> Rejected</Badge>;
    }
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Contractor</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">ID</TableHead>
              <TableHead className="font-bold text-right">Credits</TableHead>
              <TableHead className="font-bold text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.contracter}</TableCell>
                <TableCell>{getStatusBadge(row.status)}</TableCell>
                <TableCell className="text-blue-500">{row.id}</TableCell>
                <TableCell className="text-right">{row.credits}</TableCell>
                <TableCell className="text-right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

interface TablePageProps {
  sortOption: string;
}

export default function TablePage({ sortOption }: TablePageProps) {
  const [sortedData, setSortedData] = useState<TableData[]>([]);

  // This would typically come from an API or props
  const mockData: TableData[] = [
    { date: "11/04/2024", contracter: "Mr. Ramesh", status: "accepted", id: "567779AB", credits: 100, amount: "INR 20,000" },
    { date: "12/04/2024", contracter: "Mr. Mukesh", status: "rejected", id: "567780AC", credits: 150, amount: "INR 30,000" },
    { date: "13/04/2024", contracter: "Mr. Suresh", status: "accepted", id: "567781AD", credits: 200, amount: "INR 40,000" },
    { date: "14/04/2024", contracter: "Mr. Veda", status: "accepted", id: "567782AE", credits: 250, amount: "INR 50,000" },
    { date: "15/04/2024", contracter: "Mr. Kushi", status: "rejected", id: "567783AF", credits: 300, amount: "INR 60,000" },
    { date: "16/04/2024", contracter: "Mr. Sushant", status: "accepted", id: "567784AG", credits: 350, amount: "INR 70,000" },
    { date: "17/04/2024", contracter: "Mr. Kashyap", status: "accepted", id: "567785AH", credits: 400, amount: "INR 80,000" },
    { date: "18/04/2024", contracter: "Mr. Kaushal", status: "rejected", id: "567786AI", credits: 450, amount: "INR 90,000" },
    { date: "19/04/2024", contracter: "Mrs. Chaudhary", status: "accepted", id: "567787AJ", credits: 500, amount: "INR 100,000" },
    { date: "20/04/2024", contracter: "Mr. Chugh", status: "accepted", id: "567788AK", credits: 550, amount: "INR 110,000" },
  ];

  useEffect(() => {
    const sortData = (data: TableData[], option: string) => {
      const sorted = [...data];
      switch (option) {
        case 'date_asc':
          return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        case 'date_desc':
          return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        case 'contracter_asc':
          return sorted.sort((a, b) => a.contracter.localeCompare(b.contracter));
        case 'contracter_desc':
          return sorted.sort((a, b) => b.contracter.localeCompare(a.contracter));
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