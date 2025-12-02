require("dotenv").config();
const { PrismaClient } = require("./generated/prisma");

const { PrismaPg } = require("@prisma/adapter-pg");
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const author = await prisma.user.create({
    data: { username: "admin", email: "admin@blog.com", password: "temp" },
  });

  await prisma.post.createMany({
    data: [
      {
        title: "My First Blog Post",
        content: "...",
        published: true,
        authorId: author.id,
      },
      {
        title: "Draft About Prisma",
        content: "...",
        published: false,
        authorId: author.id,
      },
      {
        title: "Why I Love Node.js",
        content: "...",
        published: true,
        authorId: author.id,
      },
      {
        title: "Secret Post",
        content: "...",
        published: false,
        authorId: author.id,
      },
    ],
  });

  const publishedPosts = await prisma.post.findMany({
    where: { published: true },
    select: { id: true },
    orderBy: { createdAt: "asc" },
  });
  if (publishedPosts.length < 2)
    throw new Error("Expected at least two published posts.");

  await prisma.comment.createMany({
    data: [
      {
        postId: publishedPosts[0].id,
        authorId: author.id,
        content: "Great first post! 🎉",
      },
      {
        postId: publishedPosts[0].id,
        authorId: author.id,
        content: "Looking forward to more content!",
      },
      {
        postId: publishedPosts[1].id,
        authorId: author.id,
        content: "Node really is the best!",
      },
    ],
  });

  console.log("🌱 Seeding completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
