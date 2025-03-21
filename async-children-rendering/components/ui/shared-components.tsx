"use client";

import { Post, UserAnalytics } from "@/lib/user-data";
import { User } from "@prisma/client";

// A component to display a loading state
export function LoadingState() {
  return (
    <div className="animate-pulse p-4 bg-gray-800 rounded-md">
      <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-2/3 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/3"></div>
    </div>
  );
}

// A component to display an error state
export function ErrorState({ error }: { error: Error }) {
  return (
    <div className="p-4 bg-red-900 text-red-100 rounded-md border border-red-700">
      <h3 className="font-bold text-lg mb-2">Error</h3>
      <p>{error.message}</p>
    </div>
  );
}

// A component to display user posts
export function PostsList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3 text-white">Recent Posts</h3>
      {posts.length > 0 ? (
        <ul className="space-y-2">
          {posts.map((post) => (
            <li
              key={post.id}
              className="p-3 bg-gray-800 rounded border border-gray-700"
            >
              <h4 className="font-medium text-white mb-1">{post.title}</h4>
              <p className="text-sm text-gray-300 truncate">{post.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 p-3 bg-gray-800 rounded border border-gray-700">
          No posts yet.
        </p>
      )}
    </div>
  );
}

// A component to display user analytics
export function AnalyticsDisplay({ analytics }: { analytics: UserAnalytics }) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3 text-white">
        Activity Analytics
      </h3>
      <div className="p-4 bg-gray-800 rounded border border-gray-700">
        <div className="flex justify-between mb-3 pb-2 border-b border-gray-700">
          <span className="text-gray-300">Total Views:</span>
          <span className="font-medium text-white">{analytics.totalViews}</span>
        </div>
        <div className="flex justify-between mb-3 pb-2 border-b border-gray-700">
          <span className="text-gray-300">Engagement Rate:</span>
          <span className="font-medium text-white">
            {analytics.engagementRate}%
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Last Active:</span>
          <span className="font-medium text-white">
            {analytics.lastActiveDate}
          </span>
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
    <div className="bg-gray-900 shadow-xl rounded-lg p-6 border border-gray-800">
      <div className="border-b border-gray-700 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-white mb-1">
          {user.name || "User"}
        </h2>
        <p className="text-gray-400">{user.email}</p>
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
