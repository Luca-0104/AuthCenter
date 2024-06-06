"use client";

import { setting } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTransition } from "react";


const Settings = () => {
  const [isPending, startTransition] = useTransition();
  
  const handleOnClick = () => {
    startTransition(() => {
      setting({
        name: "New Name!",
      });
    });
  };

  return (
    <Card>
      <CardHeader className="w-[600px]">
        <p className="text-2xl font-semibold text-center">
          🍽️ Settings
        </p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={handleOnClick}>
          Update
        </Button>
      </CardContent>
    </Card>
  )
}

export default Settings;