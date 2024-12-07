// import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase } from "lucide-react"

export default function RedeemCreditsCard() {
  return (
    <Card className="w-full max-w-4xl mx-auto"> {/* Increased max-width */}
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold">Redeem Credits</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-8 py-8"> {/* Increased vertical spacing */}
        <Briefcase className="w-24 h-24 text-gray-400" /> {/* Increased icon size */}
        <p className="text-center text-xl font-medium">
          Want to Redeem
          <br />
          Credits ?
        </p>
        <Button 
          className="bg-emerald-400 hover:bg-emerald-500 text-white w-3/4 py-3 text-lg"
          onClick={() => window.location.href = '/RedeemPlace'}
        >
          Redeem Now
        </Button>
      </CardContent>
    </Card>
  )
}