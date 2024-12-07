"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CardUserLater4() {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Recent Succesful Transactions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Aarav Mehta</p>
            <p className="text-sm text-muted-foreground">
              aarav.mehta@email.com
            </p>
          </div>
          <div className="ml-auto font-medium">₹89,999.00</div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/02.png" alt="Avatar" />
            <AvatarFallback>SK</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Sanya Kapoor</p>
            <p className="text-sm text-muted-foreground">
              sanya.kapoor@email.com
            </p>
          </div>
          <div className="ml-auto font-medium">₹23,450.00</div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/03.png" alt="Avatar" />
            <AvatarFallback>RJ</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Rohan Joshi</p>
            <p className="text-sm text-muted-foreground">
              rohan.joshi@email.com
            </p>
          </div>
          <div className="ml-auto font-medium">₹56,700.00</div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/04.png" alt="Avatar" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Anaya Desai</p>
            <p className="text-sm text-muted-foreground">anaya.desai@email.com</p>
          </div>
          <div className="ml-auto font-medium">₹12,999.00</div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/05.png" alt="Avatar" />
            <AvatarFallback>VK</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Vikram Kumar</p>
            <p className="text-sm text-muted-foreground">
              vikram.kumar@email.com
            </p>
          </div>
          <div className="ml-auto font-medium">₹99,999.00</div>
        </div>
      </CardContent>
    </Card>
  )
}
