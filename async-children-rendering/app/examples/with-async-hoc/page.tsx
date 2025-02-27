import { WithUser } from "@/components/with-user";
import { Suspense } from "react";
import { fetchUserPosts, fetchUserAnalytics } from "@/lib/user-data";
import {
  LoadingState,
  ErrorState,
  UserProfileContent,
} from "@/components/ui/shared-components";

export default async function WithAsyncHocExample() {
  return (
    <div className="p-8 max-w-2xl mx-auto bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-white">
        Async HOC Example with WithUser
      </h1>

      <Suspense fallback={<LoadingState />}>
        <UserProfileWithPosts />
      </Suspense>
    </div>
  );
}

// This component uses WithUser and performs additional async operations
async function UserProfileWithPosts() {
  return (
    <WithUser onError={(error) => <ErrorState error={error} />}>
      {async ({ user, session }) => {
        // Perform additional async operations with the user data
        const [posts, analytics] = await Promise.all([
          fetchUserPosts({ userId: user.id }),
          fetchUserAnalytics({ userId: user.id }),
        ]);

        return (
          <>
            <UserProfileContent
              user={user}
              posts={posts}
              analytics={analytics}
            />

            <div className="mt-6 p-4 bg-blue-900/30 rounded text-sm border border-blue-800">
              <p className="text-blue-300 font-medium mb-2">
                With HOC Pattern Benefits:
              </p>
              <ul className="list-disc ml-5 text-blue-300">
                <li>Authentication logic is abstracted in the HOC</li>
                <li>Clean separation between auth, data fetching, and UI</li>
                <li>Reusable authentication across components</li>
                <li>Centralized error handling</li>
                <li>Component only focuses on its specific data needs</li>
              </ul>
            </div>
          </>
        );
      }}
    </WithUser>
  );
}
