export interface Book {
  title: string;
  author: {
    firstName: string;
    lastName: string;
  };
  tags?: string[]; // Optional tags for more complex search later
}

export const books: Book[] = [
  {
    title: "Old Man's War",
    author: {
      firstName: "John",
      lastName: "Scalzi",
    },
    tags: ["fiction", "science fiction"],
  },
  {
    title: "The Lock Artist",
    author: {
      firstName: "Steve",
      lastName: "Hamilton",
    },
    tags: ["fiction", "mystery"],
  },
  {
    title: "The Name of the Wind",
    author: {
      firstName: "Patrick",
      lastName: "Rothfuss",
    },
    tags: ["fiction", "fantasy"],
  },
  {
    title: "The Lies of Locke Lamora",
    author: {
      firstName: "Scott",
      lastName: "Lynch",
    },
    tags: ["fiction", "fantasy", "heist"],
  },
  {
    title: "Mistborn: The Final Empire",
    author: {
      firstName: "Brandon",
      lastName: "Sanderson",
    },
    tags: ["fiction", "fantasy"],
  },
  {
    title: "Red Rising",
    author: {
      firstName: "Pierce",
      lastName: "Brown",
    },
    tags: ["fiction", "science fiction", "dystopian"],
  },
  {
    title: "The Martian",
    author: {
      firstName: "Andy",
      lastName: "Weir",
    },
    tags: ["fiction", "science fiction", "survival"],
  },
  {
    title: "Project Hail Mary",
    author: {
      firstName: "Andy",
      lastName: "Weir",
    },
    tags: ["fiction", "science fiction"],
  },
  {
    title: "Dune",
    author: {
      firstName: "Frank",
      lastName: "Herbert",
    },
    tags: ["fiction", "science fiction", "epic"],
  },
  {
    title: "Foundation",
    author: {
      firstName: "Isaac",
      lastName: "Asimov",
    },
    tags: ["fiction", "science fiction", "classic"],
  },
];
