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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { combinedFormSchema } from "@/actions/schema";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { updateCombinedFormAction } from "@/actions/forms/form-3/combined";
import { onActionError } from "@/actions/safe-action-helpers";
import { cn } from "@/lib/utils";

interface CombinedForm2Props {
  defaultValues: Pick<z.infer<typeof combinedFormSchema>, "name" | "title">;
}

export function CombinedForm2({ defaultValues }: CombinedForm2Props) {
  const form = useForm<z.infer<typeof combinedFormSchema>>({
    resolver: zodResolver(combinedFormSchema),
    defaultValues: {
      // Include the passed-in values
      ...defaultValues,
      // Provide defaults for other required fields
      notificationPreference: "email",
      marketingEmails: false,
      isPublicProfile: false,
      birthDate: new Date(),
      experienceLevel: 50,
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const {
    formState: { isDirty, dirtyFields, touchedFields },
  } = form;

  type FormFields = keyof z.infer<typeof combinedFormSchema>;

  const updateForm = useAction(updateCombinedFormAction, {
    onSuccess: () => {
      toast.success("Form updated successfully!");
      form.reset(form.getValues());
    },
    onError: onActionError,
  });

  const onSubmit: SubmitHandler<z.infer<typeof combinedFormSchema>> = (
    values,
  ) => {
    updateForm.execute(values);
  };

  // Only show unsaved changes if fields are both dirty and touched
  const hasUnsavedChanges =
    isDirty &&
    Object.keys(dirtyFields).some(
      (field) => touchedFields[field as FormFields],
    );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div
          className={cn(
            "rounded-lg border p-4",
            hasUnsavedChanges && "border-orange-500",
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">
              Form with Better Validation UX
            </h3>
            {hasUnsavedChanges && (
              <span className="text-sm text-orange-500">
                You have unsaved changes
              </span>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-[100px_1fr]">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      onOpenChange={(open) => {
                        if (!open) {
                          form.trigger("title");
                        }
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a title" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mr">Mr.</SelectItem>
                        <SelectItem value="mrs">Mrs.</SelectItem>
                        <SelectItem value="ms">Ms.</SelectItem>
                        <SelectItem value="dr">Dr.</SelectItem>
                        <SelectItem value="prof">Prof.</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {touchedFields.title
                        ? "Field has been interacted with"
                        : "Field hasn't been touched yet"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                      {touchedFields.name
                        ? "Field has been interacted with"
                        : "Field hasn't been touched yet"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="submit"
            disabled={updateForm.isPending || !hasUnsavedChanges}
          >
            {updateForm.isPending ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
