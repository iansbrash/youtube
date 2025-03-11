"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { useBeforeUnload } from "@/hooks/use-before-unload";

interface ProtectionFormProps {
  defaultValues: z.infer<typeof nameSchema>;
}

export function ProtectionForm({ defaultValues }: ProtectionFormProps) {
  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues,
  });

  const { isDirty } = form.formState;

  const updateName = useAction(updateNameAction, {
    onSuccess: () => {
      toast.success("Name updated successfully!");
      // After successful submission, form is no longer dirty
      form.reset(form.getValues());
    },
    onError: onActionError,
  });

  useBeforeUnload({ shouldPreventUnload: isDirty });

  const onSubmit: SubmitHandler<z.infer<typeof nameSchema>> = (values) => {
    updateName.execute(values);
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
              <FormDescription>
                Try closing the tab or refreshing with unsaved changes to see
                the browser warning.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={updateName.isPending || !isDirty}>
            {updateName.isPending ? "Saving..." : "Save name"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
