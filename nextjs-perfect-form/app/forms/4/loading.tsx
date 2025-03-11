import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-4 w-[250px]" />
        <div className="space-y-2.5">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <Skeleton className="h-10 w-[100px]" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-4 w-[250px]" />
        <div className="space-y-2.5">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <Skeleton className="h-10 w-[100px]" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-4 w-[250px]" />
        <div className="space-y-2.5">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <Skeleton className="h-10 w-[100px]" />
      </div>
    </div>
  );
}
