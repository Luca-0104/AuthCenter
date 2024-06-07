"use client";

import { setting } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";

const Settings = () => {
  const user = useCurrentUser();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const {update} = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
    },
  });
  
  const handleOnSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      setError("");
      setSuccess("");

      setting(values).then((data) => {
        if (data.error) {
          setError(data.error);
        }
        if (data.success) {
          update();
          setSuccess(data.success);
        }
      }).catch(() => {
        setError("Something went wrong!");
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
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(handleOnSubmit)}>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="The username" disabled={isPending}/>
                </FormControl>
              </FormItem>
            )} />
            <FormSuccess message={success} />
            <FormError message={error} />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default Settings;