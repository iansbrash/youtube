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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { combinedFormSchema } from "@/actions/schema";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { updateCombinedFormAction } from "@/actions/forms/form-3/combined";
import { onActionError } from "@/actions/safe-action-helpers";
import { useBeforeUnload } from "@/hooks/use-before-unload";
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
  defaultValues: z.infer<typeof combinedFormSchema>;
}

export function CombinedForm({ defaultValues }: CombinedFormProps) {
  const form = useForm<z.infer<typeof combinedFormSchema>>({
    resolver: zodResolver(combinedFormSchema),
    defaultValues,
    mode: "onTouched",
    // reValidateMode: "onChange",
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

  useBeforeUnload({ shouldPreventUnload: isDirty });

  function onReset() {
    form.reset(defaultValues);
  }

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
            <h3 className="text-lg font-medium">Combined Form Example</h3>
            {hasUnsavedChanges && (
              <span className="text-sm text-orange-500">
                You have unsaved changes
              </span>
            )}
          </div>

          {/* Basic Info Section */}
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
                        <SelectTrigger onBlur={field.onBlur} ref={field.ref}>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Date Selection */}
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notification Preferences */}
            <FormField
              control={form.control}
              name="notificationPreference"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Notification Preference</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="email" />
                        </FormControl>
                        <FormLabel className="font-normal">Email</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="sms" />
                        </FormControl>
                        <FormLabel className="font-normal">SMS</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="push" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Push Notification
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Experience Level */}
            <FormField
              control={form.control}
              name="experienceLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Level</FormLabel>
                  <FormControl>
                    <div className="space-y-1">
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        defaultValue={[field.value]}
                        onValueChange={(vals) => {
                          field.onChange(vals[0]);

                          // Will immediately trigger validation error instead of waiting for blur
                          // This just feels a lot better from UX perspective
                          form.trigger("experienceLevel");
                        }}
                        {...field}
                        value={[field.value]}
                        className="w-[60%]"
                      />
                      <div className="text-sm text-muted-foreground">
                        Current level: {field.value}%
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Toggles and Checkboxes */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="marketingEmails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Marketing emails</FormLabel>
                      <FormDescription>
                        Receive emails about new products, features, and more.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPublicProfile"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Public Profile</FormLabel>
                      <FormDescription>
                        Make your profile visible to everyone.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
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

          {hasUnsavedChanges && (
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
