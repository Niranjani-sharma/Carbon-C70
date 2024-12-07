// import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"

interface UiFilterProps {
  onFilterChange: (filter: string) => void;
}


const UiFilter: React.FC<UiFilterProps> = ({ onFilterChange }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-white text-black border-gray-200 px-6 py-6 rounded-[10px]">
          <Filter className="mr-2 h-4 w-4" />
          Sort by
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuItem onClick={() => onFilterChange("ascending")} className="text-black hover:bg-gray-100">
          Ascending
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange("descending")} className="text-black hover:bg-gray-100">
          Descending
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange("required")} className="text-black hover:bg-gray-100">
          With Required Credits
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UiFilter;