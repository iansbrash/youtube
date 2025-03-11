"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { updateName } from "@/actions/forms/form-2";
import { toast } from "sonner";

interface Form3Props {
  defaultValues: z.infer<typeof nameSchema>;
}

export function Form2({ defaultValues }: Form3Props) {
  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof nameSchema>> = async (
    values,
  ) => {
    const result = await updateName(values);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Name updated successfully!");
  };

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
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : "Save name"}
        </Button>
      </form>
    </Form>
  );
}
