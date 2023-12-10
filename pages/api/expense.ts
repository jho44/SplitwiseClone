import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import type { PaidDetails } from "@/components/dashboard/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  if (req.method === "POST") {
    const {
      splitDetails,
      paidDetails,
      recipients,
      // expenseDate, // TODO
      // notes       // TODO
      creatorEmail,
      description, // groupId: undefined
    }: {
      splitDetails: { [key: string]: number };
      paidDetails: PaidDetails;
      recipients: string[];
      creatorEmail: string;
      description: string;
    } = JSON.parse(req.body);

    // replace emails with userIds
    const creatorUser = await prisma.user.findUniqueOrThrow({
      where: {
        email: creatorEmail,
      },
      select: {
        id: true,
      },
    });

    const expenseDetails = await Promise.all(
      recipients.map(async (email) => {
        const base = {
          amtPaid: paidDetails[email] ?? 0,
          amtOwed: splitDetails[email] ?? 0,
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
          return {
            user: {
              connect: {
                id: user.id,
              },
            },
            ...base,
          };
        }
        return {
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
        };
      }),
    );

    expenseDetails.push({
      user: {
        connect: {
          id: creatorUser.id,
        },
      },
      amtPaid: paidDetails[creatorEmail] ?? 0,
      amtOwed: splitDetails[creatorEmail] ?? 0,
    });

    await prisma.expense.create({
      data: {
        expenseDetails: {
          create: expenseDetails,
        },
        creator: {
          connect: {
            id: creatorUser.id,
          },
        },
        description,
        // expenseDate, // TODO
        // notes       // TODO
      },
    });

    res.status(200).send("ok");
    return;
  }

  throw new Error(
    `The HTTP ${req.method} method is not supported at this route.`,
  );
}
