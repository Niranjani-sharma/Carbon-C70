import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function CardUserLater3() {
  return (
    <Card className="w-[350px]">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Bids</CardTitle>
          <CardDescription>
            Recent Applications on your last bid
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead className="text-right">City</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">Rahul Sharma</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  rahul.sharma@example.com
                </div>
              </TableCell>
              <TableCell className="text-right">Mumbai</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Priya Patel</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  priya.patel@example.com
                </div>
              </TableCell>
              <TableCell className="text-right">Delhi</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Amit Kumar</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  amit.kumar@example.com
                </div>
              </TableCell>
              <TableCell className="text-right">Bangalore</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Sneha Reddy</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  sneha.reddy@example.com
                </div>
              </TableCell>
              <TableCell className="text-right">Hyderabad</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Vikram Singh</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  vikram.singh@example.com
                </div>
              </TableCell>
              <TableCell className="text-right">Chennai</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}