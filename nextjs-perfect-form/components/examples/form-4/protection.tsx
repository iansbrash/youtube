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
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ProtectionFormProps {
  defaultValues: z.infer<typeof nameSchema>;
}

export function ProtectionForm({ defaultValues }: ProtectionFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues,
  });

  const { isDirty } = form.formState;
  const [showDialog, setShowDialog] = useState(false);
  const [pendingPath, setPendingPath] = useState<string>();

  const updateName = useAction(updateNameAction, {
    onSuccess: () => {
      toast.success("Name updated successfully!");
      // After successful submission, form is no longer dirty
      form.reset(form.getValues());

      // If we were trying to navigate away, do so now
      if (pendingPath) {
        router.push(pendingPath);
      }
    },
    onError: onActionError,
  });

  const onBeforeNavigate = useCallback(
    (path: string) => {
      if (isDirty) {
        setPendingPath(path);
        setShowDialog(true);
        // Return true to prevent navigation
        return true;
      }
      return false;
    },
    [isDirty],
  );

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  async function onSubmit(values: z.infer<typeof nameSchema>) {
    updateName.execute(values);
  }

  return (
    <>
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
                  Try to navigate away with unsaved changes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4">
            <Button type="submit" disabled={updateName.isPending}>
              {updateName.isPending ? "Saving..." : "Save name"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onBeforeNavigate("/forms/2")}
            >
              Try to Navigate Away
            </Button>
          </div>
        </form>
      </Form>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Would you like to save them before
              leaving?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingPath) {
                  router.push(pendingPath);
                }
              }}
            >
              Leave without Saving
            </AlertDialogAction>
            <AlertDialogAction
              onClick={() => {
                form.handleSubmit(onSubmit)();
              }}
            >
              Save and Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
