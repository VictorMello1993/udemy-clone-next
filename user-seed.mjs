import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.user.createMany({
      data: [
        { name: "Victor", email: "victorsmello93@gmail.com" },
        { name: "Fulano", email: "emaildofulano@hotmail.com" },
        { name: "Ciclano", email: "emaildociclano@gmail.com" },
        { name: "User1", email: "user1@bol.com.br" },
        { name: "User2", email: "user2@gmail.com" },
      ],
    });
    console.log("Users posted successfully!");
  } catch (error) {
    console.log(error);
  }
})();
