import { Post, UserAnalytics } from "@/lib/user-data";
import { User } from "@prisma/client";

// A component to display a loading state
export function LoadingState() {
  return (
    <div className="animate-pulse p-4 bg-gray-100 rounded-md">
      <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
    </div>
  );
}

// A component to display an error state
export function ErrorState({ error }: { error: Error }) {
  return (
    <div className="p-4 bg-red-100 text-red-700 rounded-md">
      <h3 className="font-bold">Error</h3>
      <p>{error.message}</p>
    </div>
  );
}

// A component to display user posts
export function PostsList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Recent Posts</h3>
      {posts.length > 0 ? (
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.id} className="p-3 bg-gray-50 rounded">
              <h4 className="font-medium">{post.title}</h4>
              <p className="text-sm text-gray-600 truncate">{post.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No posts yet.</p>
      )}
    </div>
  );
}

// A component to display user analytics
export function AnalyticsDisplay({ analytics }: { analytics: UserAnalytics }) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Activity Analytics</h3>
      <div className="p-3 bg-gray-50 rounded">
        <div className="flex justify-between mb-2">
          <span>Total Views:</span>
          <span className="font-medium">{analytics.totalViews}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Engagement Rate:</span>
          <span className="font-medium">{analytics.engagementRate}%</span>
        </div>
        <div className="flex justify-between">
          <span>Last Active:</span>
          <span className="font-medium">{analytics.lastActiveDate}</span>
        </div>
      </div>
    </div>
  );
}

// A component to display user profile with posts and analytics
export function UserProfileContent({
  user,
  posts,
  analytics,
}: {
  user: User;
  posts: Post[];
  analytics: UserAnalytics;
}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User's posts section */}
        <PostsList posts={posts} />

        {/* Analytics section */}
        <AnalyticsDisplay analytics={analytics} />
      </div>
    </div>
  );
}
