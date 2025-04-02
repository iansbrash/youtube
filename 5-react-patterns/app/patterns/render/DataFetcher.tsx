import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface DataFetcherProps {
  children: (props: {
    data: Post[] | null;
    loading: boolean;
    error: Error | null;
  }) => React.ReactNode;
}

export function DataFetcher({ children }: DataFetcherProps) {
  const [data, setData] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const posts = await response.json();
        setData(posts.slice(0, 5));
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return children({ data, loading, error });
}
