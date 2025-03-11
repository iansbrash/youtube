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
import { updateNameAction } from "@/actions/forms/form-3";
import { onActionError } from "@/actions/safe-action-helpers";
import { useBeforeUnload } from "@/hooks/use-before-unload";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CombinedFormProps {
  defaultValues: z.infer<typeof nameSchema>;
}

export function CombinedForm({ defaultValues }: CombinedFormProps) {
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

  function onReset() {
    form.reset(defaultValues);
  }

  const onSubmit: SubmitHandler<z.infer<typeof nameSchema>> = (values) => {
    updateName.execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div
          className={cn(
            "rounded-lg border p-4",
            isDirty && "border-orange-500",
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Combined Form Example</h3>
            {isDirty && (
              <span className="text-sm text-orange-500">
                You have unsaved changes
              </span>
            )}
          </div>
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
                  This form combines all features: safe actions, dirty state
                  management, and browser-level navigation protection.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={updateName.isPending || !isDirty}>
            {updateName.isPending ? "Saving..." : "Save name"}
          </Button>

          {isDirty && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" type="button">
                  Reset Form
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will reset the form to its initial state. Any unsaved
                    changes will be lost.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onReset}>
                    Reset Form
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </form>
    </Form>
  );
}
