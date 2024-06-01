import { ExtendedUser } from '@/next-auth'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from '@radix-ui/react-label'
import { Badge } from './ui/badge'

interface Props {
  user?: ExtendedUser,
  label: string
}

export const UserInfo = ({ user, label }: Props) => {
  return (
    <Card className='w-[600px] shadow-md'>
      <CardHeader className='text-center text-2xl font-semibold'>
        <p>{label}</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className="space-x-4 rounded-md border p-4 w-full flex items-center justify-between">
          <p className="text-sm font-medium leading-none">
            ID
          </p>
          <p className="text-sm text-muted-foreground truncate max-w-[180px] font-mono bg-slate-100 p-1 rounded-md">
            { user?.id }
          </p>
        </div>
        <div className="space-x-4 rounded-md border p-4 w-full flex items-center justify-between">
          <p className="text-sm font-medium leading-none">
            Name
          </p>
          <p className="text-sm text-muted-foreground truncate max-w-[180px] font-mono bg-slate-100 p-1 rounded-md">
            { user?.name }
          </p>
        </div>
        <div className="space-x-4 rounded-md border p-4 w-full flex items-center justify-between">
          <p className="text-sm font-medium leading-none">
            Email
          </p>
          <p className="text-sm text-muted-foreground truncate max-w-[180px] font-mono bg-slate-100 p-1 rounded-md">
            { user?.email }
          </p>
        </div>
        <div className="space-x-4 rounded-md border p-4 w-full flex items-center justify-between">
          <p className="text-sm font-medium leading-none">
            Role
          </p>
          <p className="text-sm text-muted-foreground truncate max-w-[180px] font-mono bg-slate-100 p-1 rounded-md">
            { user?.role }
          </p>
        </div>
        <div className="space-x-4 rounded-md border p-4 w-full flex items-center justify-between">
          <p className="text-sm font-medium leading-none">
            Two Factor Authentication
          </p>
          <Badge variant={user?.isTwoFactorEnabled ? "green" : "destructive"}>
            { user?.isTwoFactorEnabled ? "ON" : "OFF" }
          </Badge>
        </div>
      </CardContent>
    </Card>

  )
}
