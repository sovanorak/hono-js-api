import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  //generate random users data
  const users = Array.from({ length: 10 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }));

  await prisma.user.createMany({
    data: users,
  });

  console.log("Database seeding... 🌱🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
