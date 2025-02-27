// Define types for our mock data
export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface UserAnalytics {
  totalViews: number;
  engagementRate: string;
  lastActiveDate: string;
}

/**
 * Mock function to simulate fetching user posts
 * In a real app, this would likely be an API call or database query
 */
export async function fetchUserPosts({
  userId,
}: {
  userId: string;
}): Promise<Post[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Return mock posts data
  return [
    {
      id: "1",
      title: "Getting Started with Next.js",
      content:
        "Next.js is a React framework that enables server-side rendering and static site generation...",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
    {
      id: "2",
      title: "Understanding React Server Components",
      content:
        "React Server Components allow you to write components that run only on the server...",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    },
    {
      id: "3",
      title: "The Power of TypeScript",
      content:
        "TypeScript adds static type definitions to JavaScript, helping you catch errors early...",
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    },
  ];
}

/**
 * Mock function to simulate fetching user analytics
 * In a real app, this might be an API call to an analytics service
 */
export async function fetchUserAnalytics({
  userId,
}: {
  userId: string;
}): Promise<UserAnalytics> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    totalViews: Math.floor(Math.random() * 10000),
    engagementRate: (Math.random() * 20).toFixed(1),
    lastActiveDate: new Date().toLocaleDateString(),
  };
}
