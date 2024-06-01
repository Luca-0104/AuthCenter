"use client";

import { RoleGate } from '@/components/auth/RoleGate';
import { FormSuccess } from '@/components/form-success';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UserRole } from '@prisma/client';

const AdminPage = () => {
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
      </CardContent>
    </Card>
  )
}

export default AdminPage