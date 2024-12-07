import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BidFormData {
  name: string;
  carbonCredits: number;
  price: number;
}

const BidForm: React.FC<{ onSubmit: (data: BidFormData) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<BidFormData>({
    name: "",
    carbonCredits: 0,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'name' ? value : Number(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Bid Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="carbonCredits" className="text-right">
            Carbon Credits
          </Label>
          <Input
            id="carbonCredits"
            name="carbonCredits"
            type="number"
            value={formData.carbonCredits}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
            Price (INR)
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" className="bg-emerald-600 text-white hover:bg-emerald-700">Submit Bid</Button>
      </DialogFooter>
    </form>
  );
};

export default function CarbonCreditCard() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (data: BidFormData) => {
    console.log("New bid submitted:", data);
    // Here you would typically send this data to your backend or update your app state
    setOpen(false);
  };

  return (
    <Card className="bg-emerald-600 text-white w-full mx-auto pt-4">
      <CardContent className="flex flex-col items-center justify-center h-full p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">Want More Carbon Credits?</h2>
        <p className="text-white-200">Post a New Bid Now</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" className="bg-white w-[100px] text-gray-900 hover:bg-emerald-100">
              Post Bid
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Post a New Bid</DialogTitle>
              <DialogDescription>
                Enter the details for your new carbon credit bid here.
              </DialogDescription>
            </DialogHeader>
            <BidForm onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}