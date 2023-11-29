"use server";

import { type FormSchemaType } from "../types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function actionLoginUser({ email, password }: FormSchemaType) {
  const supabase = createRouteHandlerClient({ cookies });

  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return response;
}
