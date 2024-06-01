"use client";

import { admin } from '@/actions/admin';
import { RoleGate } from '@/components/auth/RoleGate';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UserRole } from '@prisma/client';
import { toast } from 'sonner';

const AdminPage = () => {
  const handleOnServerActionClick = () => {
    admin()
      .then((data) => {
        if (data.error) {
          toast.error("Forbidden Server Action! 🚫🔞🚭🚷🈲⚤🖕");
        }
        if (data.success) {
          toast.success("You are allowed to access! 💖❤️❤️💗💞💘");
        }
      })
  }
  const handleOnApiRouteClick = () => {
    fetch("/api/admin")
      .then((response) => {
        if (response.ok) {
          toast.success("You are allowed to access! 💖❤️❤️💗💞💘");
        } else {
          toast.error("Forbidden API Route! 🚫🔞🚭🚷🈲⚤🖕");
        }
      })
  };

  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <p className='text-2xl text-center font-semibold'>
          🈲 Admin
        </p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message='Your are allowed to access!'/>
        </RoleGate>
        <div className='flex items-center justify-between border rounded-lg p-4 shadow-md'>
          <p className='text-sm font-medium'>
            🔞 Admin-only API Route
          </p>
          <Button onClick={handleOnApiRouteClick}>
            Click to test
          </Button>
        </div>
        <div className='flex items-center justify-between border rounded-lg p-4 shadow-md'>
          <p className='text-sm font-medium'>
            🚱 Admin-only Server Action
          </p>
          <Button onClick={handleOnServerActionClick}>
            Click to test
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminPage