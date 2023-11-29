"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "@/lib/types";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/cypresslogo.svg";

type FormSchemaType = z.infer<typeof FormSchema>;

const LoginPage = ({}) => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string>();

  const form = useForm<FormSchemaType>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<FormSchemaType> = async (formData) => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
      >
        <Link href={"/"} className="w-full flex justify-left items-center">
          <Image src={Logo} alt="logo" width={50} height={50} />
          <span className="font-semibold dark:text-white text-4xl ml-2">Logo</span>
        </Link>
      </form>
    </Form>
  );
};

export default LoginPage;
