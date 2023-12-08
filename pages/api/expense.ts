import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method === "POST") {
    const { creatorEmail, splitDetails } = JSON.parse(req.body);

    // replace emails with userIds
    const creatorUser = await prisma.user.findUniqueOrThrow({
      where: {
        email: creatorEmail,
      },
      select: {
        id: true,
      },
    });

    Object.entries(splitDetails as { [key: string]: number }).forEach(
      async ([email, amtPaid]) => {
        const base = {
          creator: {
            connect: {
              id: creatorUser.id,
            },
          },
          description: {},
          amtPaid,
          // expenseDate, // TODO
          // notes       // TODO
        };
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        });
        if (user) {
          await prisma.expense.create({
            data: {
              user: {
                connect: {
                  id: user.id,
                },
              },
              ...base,
            },
          });
          return;
        }
        await prisma.expense.create({
          data: {
            invitedUser: {
              connectOrCreate: {
                where: {
                  email,
                },
                create: {
                  email,
                },
              },
            },
            ...base,
          },
        });
      },
    );
    res.status(200).send('ok');
    return;
  }

  throw new Error(
    `The HTTP ${req.method} method is not supported at this route.`,
  );
}
