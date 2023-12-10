# Fullstack Authentication Example with Next.js and NextAuth.js

This is the starter project for the fullstack tutorial with Next.js and Prisma. You can find the final version of this project in the [`final`](https://github.com/prisma/blogr-nextjs-prisma/tree/final) branch of this repo.

Because Prisma Client is tailored to your own schema, you need to update it every time your Prisma schema file is changing by running the following command:

`npx prisma generate`

## Implementation Notes

- maybe it's time to use useContext...
  - for passing setPaidDetails down to `RecipientsInput.tsx` -- not needed in `addExpense/Header.tsx`
