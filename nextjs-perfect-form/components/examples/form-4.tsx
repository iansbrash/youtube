"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { nameSchema } from "@/actions/schema";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { updateNameAction } from "@/actions/forms/form-4";
import { onActionError } from "@/actions/safe-action-helpers";

interface Form4Props {
  defaultValues: z.infer<typeof nameSchema>;
}

export function Form4({ defaultValues }: Form4Props) {
  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues,
  });

  const updateName = useAction(updateNameAction, {
    onSuccess: () => {
      toast.success("Name updated successfully!");

      // Could possibly reset form in some cases
      // i.e. password reset form
      // form.reset()
    },
    onError: onActionError,
  });

  async function onSubmit(values: z.infer<typeof nameSchema>) {
    updateName.execute(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormDescription>This is your display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={updateName.isPending}>
          {updateName.isPending ? "Saving..." : "Save name"}
        </Button>
      </form>
    </Form>
  );
}
