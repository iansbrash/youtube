import { redirect } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@/config/auth";
import { prisma } from "@/prisma/client";
import { fetchUserPosts, fetchUserAnalytics } from "@/lib/user-data";
import {
  LoadingState,
  ErrorState,
  UserProfileContent,
} from "@/components/ui/shared-components";

export default async function WithoutAsyncHocExample() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Without Async HOC Example</h1>

      <Suspense fallback={<LoadingState />}>
        <UserProfileWithPosts />
      </Suspense>
    </div>
  );
}

// This component has the user fetching logic directly embedded
async function UserProfileWithPosts() {
  try {
    // User authentication and fetching logic directly in the component
    // This duplicates the logic from WithUser HOC
    const session = await auth();
    const user_id = session?.user?.id;

    if (!user_id) {
      return redirect("/login");
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: user_id,
      },
      include: {},
    });

    // Additional async operations with the user data
    // These would normally be in the children function of the HOC
    const [posts, analytics] = await Promise.all([
      fetchUserPosts({ userId: user.id }),
      fetchUserAnalytics({ userId: user.id }),
    ]);

    // UI rendering mixed with all the data fetching logic
    return (
      <>
        <UserProfileContent user={user} posts={posts} analytics={analytics} />

        <div className="mt-6 p-3 bg-yellow-50 rounded text-sm">
          <p className="text-yellow-800 font-medium mb-2">
            <strong>Without HOC Pattern Issues:</strong>
          </p>
          <ul className="list-disc ml-5 text-yellow-800">
            <li>
              Authentication logic is duplicated across components that need it
            </li>
            <li>Error handling is mixed with business logic</li>
            <li>
              Component has multiple responsibilities (auth, data fetching,
              rendering)
            </li>
            <li>Harder to reuse the authentication logic</li>
            <li>Testing becomes more complex</li>
          </ul>
        </div>
      </>
    );
  } catch (error) {
    // Error handling directly in the component
    if (error instanceof Error) {
      return <ErrorState error={error} />;
    }
    throw error;
  }
}
