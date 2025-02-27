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
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
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

            <div className="mt-6 p-3 bg-blue-50 rounded text-sm">
              <p className="text-blue-800 font-medium mb-2">
                With HOC Pattern Benefits:
              </p>
              <ul className="list-disc ml-5 text-blue-800">
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
