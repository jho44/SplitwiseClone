import SignIn from "@/components/signIn/SignIn";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    let user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: session.user.name,
          email: session.user.email,
        },
      });
      // TODO: redirect to onboarding
    }

    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const IndexPage = () => {
  return <SignIn />;
};

export default IndexPage;
