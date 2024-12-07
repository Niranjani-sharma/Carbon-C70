"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"

export default function Component() {
  const [credits, setCredits] = useState("")
  const navigate = useNavigate()

  const handleRedeem = () => {
    const creditAmount = parseInt(credits)
    if (isNaN(creditAmount) || creditAmount <= 0) {
      toast.error("Please enter a valid number of credits")
      return
    }
    if (creditAmount > 400) {
      toast.error("You can't redeem more than 400 credits at once")
      return
    }

    // Here you would typically make an API call to process the redemption
    // For this example, we'll simulate a successful redemption
    toast.success("Transaction successful!")
    
    // Update the total credits in card_wallet2
    // You'll need to implement a state management solution or context to share this data
    // For now, we'll use localStorage as a simple example
    const currentTotal = parseInt(localStorage.getItem("totalRedeemedCredits") || "0")
    localStorage.setItem("totalRedeemedCredits", (currentTotal + creditAmount).toString())

    // Navigate to the wallet page after a short delay
    setTimeout(() => {
      navigate("/Wallet")
    }, 2000)
  }

  return (
    <Card className="w-96 p-8 space-y-6">
      <CardContent className="flex flex-col items-center space-y-6">
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold">Company Name: Nike</h2>
        <div className="w-full max-w-[150px]">
          <Input
            type="number"
            placeholder="00"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            className="text-6xl font-bold text-center text-gray-700 p-2 h-auto placeholder:text-gray-300 placeholder:text-6xl"
            aria-label="Credits"
          />
        </div>
        <p className="text-base text-gray-500">Credits</p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-lg py-6"
          onClick={handleRedeem}
        >
          Redeem Now
        </Button>
      </CardFooter>
    </Card>
  )
}