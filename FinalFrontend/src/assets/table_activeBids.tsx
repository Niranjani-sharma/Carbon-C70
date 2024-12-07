import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Applicant {
  date: string;
  contractorName: string;
  status: boolean;
  id: string;
  credits: number;
  city: string;
}

interface BidData {
  _id: string;
  name: string;
  carbonCredits: number;
  applicants: Applicant[];
}

interface DynamicBidDetailsProps {
  bidData: BidData;
  onDeactivate: (bidId: string) => void;
  onBidRemove: (bidId: string) => void;
  onApplicantRemove: (bidId: string, applicantId: string) => void;
}

const DynamicBidDetails: React.FC<DynamicBidDetailsProps> = ({ 
  bidData, 
  onDeactivate, 
  onBidRemove, 
  onApplicantRemove 
}) => {
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
  const price = bidData.carbonCredits * 14.5; // Calculate the price based on carbon credits

  const handleDeactivateConfirm = () => {
    onDeactivate(bidData._id);
    setIsDeactivateDialogOpen(false);
  };

  const handlePayment = async (applicantId: string) => {
    // Open payment gateway in a new window
    const paymentWindow = window.open('https://test.instamojo.com/@vibhavsingh14101976/ld6545b07fa214e3c857990a8b0e99f6a/', '_blank');
    
    // Check if payment was successful
    const checkPaymentStatus = () => {
      if (paymentWindow?.closed) {
        // Assume payment was successful if the window was closed
        // In a real implementation, you'd verify this with your backend
        onBidRemove(bidData._id);
      } else {
        setTimeout(checkPaymentStatus, 1000); // Check again after 1 second
      }
    };

    setTimeout(checkPaymentStatus, 1000); // Start checking after 1 second
  };

  const handleApplicantRemove = (applicantId: string) => {
    onApplicantRemove(bidData._id, applicantId);
  };

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Bid {bidData.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-8">
          <div>
            <div className="text-4xl font-bold">{bidData.carbonCredits.toLocaleString()}</div>
            <div className="text-gray-500">Carbon Credits</div>
          </div>
          <div>
            <div className="text-4xl font-bold">{Math.round(price).toLocaleString()}</div>
            <div className="text-gray-500">INR to be Spent</div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="gap-4">
              <TableHead>Date</TableHead>
              <TableHead>Contractor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>City</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="gap-4">
            {bidData.applicants.map((applicant, index) => (
              <TableRow key={index}>
                <TableCell className="text-gray-500">{new Date(applicant.date).toLocaleDateString()}</TableCell>
                <TableCell>{applicant.contractorName}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="p-0 h-auto"
                      onClick={() => handlePayment(applicant.id)}
                    >
                      <Check className="w-5 h-5 text-green-500" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="p-0 h-auto"
                      onClick={() => handleApplicantRemove(applicant.id)}
                    >
                      <X className="w-5 h-5 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-blue-500">{applicant.id}</TableCell>
                <TableCell className="flex-col align-center">{applicant.credits}</TableCell>
                <TableCell className="flex-col align-center">{applicant.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6">
          <Button 
            className="bg-emerald-600 hover:bg-emerald-500 text-white"
            onClick={() => setIsDeactivateDialogOpen(true)}
          >
            Deactivate Bid
          </Button>
        </div>
      </CardContent>
      <AlertDialog open={isDeactivateDialogOpen} onOpenChange={setIsDeactivateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to deactivate this bid?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This bid will be removed from the active bids list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeactivateConfirm}>Deactivate</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

interface Bid {
  _id: string;
  name: string;
  carbonCredits: number;
  price: number;
  applicants: any[]; // You might want to define a more specific type for applicants
}

interface BidDetailsPageProps {
  bids: Bid[];
  onBidRemove: (bidId: string) => void;
  onApplicantRemove: (bidId: string, applicantId: string) => void;
}

export default function BidDetailsPage({ bids, onBidRemove, onApplicantRemove }: BidDetailsPageProps) {
  const handleDeactivate = (bidId: string) => {
    console.log(`Bid ${bidId} has been deactivated`);
    // Implement deactivation logic here
    onBidRemove(bidId);
  };

  return (
    <div>
      {bids.map(bid => (
        <DynamicBidDetails 
          key={bid._id} 
          bidData={bid} 
          onDeactivate={handleDeactivate} 
          onBidRemove={onBidRemove}
          onApplicantRemove={onApplicantRemove}
        />
      ))}
    </div>
  );
}