import { Button } from "@/components/ui/button"
import { Card as UICard, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { toast } from 'react-toastify';

interface CustomCardProps {
  title: string;
  credits: number;
  image: string;
}

function CustomCard({ title, credits, image }: CustomCardProps) {
  const [isApplied, setIsApplied] = useState(false)

  const handleClick = () => {
    if (!isApplied) {
      setIsApplied(true);
      toast.success(`You have successfully posted your application request to ${title}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setIsApplied(false);
    }
  }

  return (
    <UICard className="bg-white rounded-[15px] shadow-lg px-8 py-6 w-[350px]">
      <CardContent className="flex flex-col items-center p-6 space-y-4 font-Inter,sans-serif">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt={`${title} logo`}
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-xl font-semibold font-Inter,sans-serif">{title}</h2>
        <div className="text-6xl font-bold font-Inter,sans-serif text-black-500">{credits}</div>
        <div className="text-gray-500 font-Inter,sans-serif">Credits Needed</div>
        <Button 
          className={`text-white font-[650] py-6 px-8 rounded-[10px] font-Inter,sans-serif transition-colors duration-300 ${
            isApplied 
              ? "bg-blue-600 hover:bg-blue-700" 
              : "bg-emerald-400 hover:bg-emerald-500"
          }`}
          onClick={handleClick}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </Button>
      </CardContent>
    </UICard>
  )
}

export default CustomCard;