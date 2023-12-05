import Image from "next/image";
import { signIn } from "next-auth/react";
import Button from "@/components/buttons/Button";

const SignIn = () => {
  const handleSignIn = async () => {
    signIn("google");
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-[10%]">
      <div className="flex flex-col items-center gap-[9px]">
        <Image
          src="/logo.svg"
          width={0}
          height={0}
          alt="Logo"
          style={{ width: "87px", height: "auto" }}
        />
        <label className="text-base tracking-[0.85px] font-bold">
          SplitwiseClone
        </label>
      </div>

      <div className="flex flex-col gap-6">
        <Button
          btn={{
            colorType: "teal" as const,
            onClick: handleSignIn,
          }}
        >
          Sign up
        </Button>
        <Button
          btn={{
            colorType: "black-100" as const,
            onClick: handleSignIn,
          }}
        >
          Log in
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
