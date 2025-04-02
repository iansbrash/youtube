interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export async function Posts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });
  const posts: Post[] = await res.json();

  // Add artificial delay to demonstrate loading state
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Latest Posts</h2>
      <ul className="space-y-2">
        {posts.slice(0, 5).map((post) => (
          <li key={post.id} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700">{post.title}</h3>
            <p className="mt-1 text-gray-600 line-clamp-2">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
