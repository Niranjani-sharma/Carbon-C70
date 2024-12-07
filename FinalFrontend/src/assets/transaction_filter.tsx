import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface TransactionFilterProps {w
  onFilterChange: (filterOption: string) => void;
}

const TransactionFilter: React.FC<TransactionFilterProps> = ({ onFilterChange }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Sort by <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onFilterChange('date_asc')}>Date (Ascending)</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange('date_desc')}>Date (Descending)</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange('company_asc')}>Company (A-Z)</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange('company_desc')}>Company (Z-A)</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange('credits_asc')}>Credits (Low to High)</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange('credits_desc')}>Credits (High to Low)</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange('amount_asc')}>Amount (Low to High)</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange('amount_desc')}>Amount (High to Low)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TransactionFilter;
