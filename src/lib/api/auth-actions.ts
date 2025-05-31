"use server";

import { z } from 'zod';
import { registerUserService, loginUserService, forgotPasswordUserService, resetPasswordUserService, emailConfirmationUserService } from '@/app/lib/api/auth-service';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

const schemaRegister = z.object({
  realname: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string()
    .min(8)
    .max(100)
    .refine((password) => /[0-9]/.test(password))
    .refine((password) =>/[a-zA-Z]/.test(password)),
});

export async function registerUserAction(
  prevState: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  formData: FormData
) {
  console.log("Hello From Register User Action");

  const email = formData.get("email");
  const affixedEmail = email && `${email}@kookmin.ac.kr`;

  const realname = formData.get("realname");
  const username = `${realname}${email}`;

  const validatedFields = schemaRegister.safeParse({
    realname: realname,
    username: username,
    email: affixedEmail,
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const responseData = await registerUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("jwt", responseData.jwt, config);
}

const schemaLogin = z.object({
  identifier: z.string(),
  password: z.string(),
});

export async function loginUserAction(
  prevState: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  formData: FormData,
  searchParams: string,
) {
  const email = formData.get("email");
  const affixedEmail = email && `${email}@kookmin.ac.kr`;

  const validatedFields = schemaLogin.safeParse({
    identifier: affixedEmail,
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const responseData = await loginUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Login.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("jwt", responseData.jwt, config);

  redirect(`/user/dashboard?${searchParams}`);
}

export async function logoutAction(searchParams: string) {
  const cookieStore = await cookies();
  cookieStore.set("jwt", "", { ...config, maxAge: 0 });
  cookieStore.set("username", "", { ...config, maxAge: 0 });
  redirect(`/?${searchParams}`);
}

const schemaForgotPassword = z.object({
  email: z.string(),
});

export async function forgotPasswordAction(
  prevState: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  formData: FormData
) {

  const email = formData.get("email");
  const affixedEmail = email && `${email}@kookmin.ac.kr`;

  const validatedFields = schemaForgotPassword.safeParse({
    email: affixedEmail,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields. Failed to Send Forgot Password Email.",
    };
  }

  const responseData = await forgotPasswordUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Send Forgot Password Email.",
    };
  }

  return {
    ...prevState,
    zodErrors: null,
    message: responseData.message || "Password reset email sent successfully!",
  };
}

const schemaResetPassword = z.object({
  code: z.string(),
  password: z.string()
    .min(8)
    .max(100)
    .refine((password) => /[0-9]/.test(password))
    .refine((password) =>/[a-zA-Z]/.test(password)),
  passwordConfirmation: z.string()
    .min(8)
    .max(100)
    .refine((password) => /[0-9]/.test(password))
    .refine((password) =>/[a-zA-Z]/.test(password)),
});

export async function resetPasswordAction(
  prevState: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  formData: FormData
) {
  const validatedFields = schemaResetPassword.safeParse({
    code: formData.get("code"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("passwordConfirmation"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const responseData = await resetPasswordUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      zodErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (!responseData.success) {
    return {
      ...prevState,
      zodErrors: null,
      message: responseData.message || "Failed to reset password.",
    };
  }

  return {
    ...prevState,
    zodErrors: null,
    message: responseData.message || "Password reset email sent successfully!",
  };
}

const schemaEmailConfirmation = z.object({
  email: z.string()
});

export async function emailConfirmationAction(
  prevState: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  formData: FormData
) {

  const email = formData.get("email");
  const affixedEmail = email && `${email}@kookmin.ac.kr`;

  const validatedFields = schemaEmailConfirmation.safeParse({
    email: affixedEmail,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Resend Email Confirmation.",
    };
  }

  const responseData = await emailConfirmationUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      zodErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (!responseData.success) { // Check for failure with the success property
    return {
      ...prevState,
      zodErrors: null,
      message: responseData.message || "Failed to resend email confirmation.",
    };
  }

  return {
    ...prevState,
    zodErrors: null,
    message: responseData.message || "Email confirmation email sent successfully!",
  };
}