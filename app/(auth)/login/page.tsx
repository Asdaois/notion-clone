"use client";
import { useRouter } from "next/navigation";
import { JSXElementConstructor, ReactElement, useState } from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  SubmitHandler,
  UseFormStateReturn,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "@/lib/types";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/cypresslogo.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/global/Loader";
import { actionLoginUser } from "@/lib/server-action/auth-actions";

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

  const onSubmit: SubmitHandler<FormSchemaType> = async (formData) => {
    const { error } = await actionLoginUser(formData);

    if (error) {
      form.reset();
      setSubmitError(error.message);
    }

    router.replace("/dashboard");
  };

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
          <span className="font-semibold dark:text-white text-4xl ml-2">
            Logo
          </span>
        </Link>
        <FormDescription className="text-foreground/60">
          An All-In-One Collaboration and Productivity Platform
        </FormDescription>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={(field) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="password"
          render={(field) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button
          disabled={isLoading}
          type="submit"
          className="w-full p-6"
          size={"lg"}
        >
          {!isLoading ? "Login" : <Loader />}
        </Button>
        <span className="self-container">
          Don&apos;t have an account?{" "}
          <Link href={"/signup"} className="text-primary">
            Sing up
          </Link>
        </span>
      </form>
    </Form>
  );
};

export default LoginPage;
