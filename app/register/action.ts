/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

// export const registerUser = async ({
//   email,
//   password,
//   passwordConfirm,
// }: {
//   email: string;
//   password: string;
//   passwordConfirm: string;
// }) => {
//   const newUserSchema = z
//     .object({
//       email: z.string().email(),
//     })
//     .and(passwordMatchSchema);

//   const newUserValidation = newUserSchema.safeParse({
//     email,
//     password,
//     passwordConfirm,
//   });

//   if (!newUserValidation.success) {
//     return {
//       error: true,
//       message: newUserValidation.error.issues[0]?.message ?? "An error occured",
//     };
//   }
// };

export const registerUser = async ({
  email,
  password,
  passwordConfirm,
}: {
  email: string;
  password: string;
  passwordConfirm: string;
}) => {
  const newUserSchema = z
    .object({
      email: z.string().email(),
    })
    .and(passwordMatchSchema);

  const newUserValidation = newUserSchema.safeParse({
    email,
    password,
    passwordConfirm,
  });

  if (!newUserValidation.success) {
    return {
      error: true,
      message: newUserValidation.error.issues[0]?.message ?? "An error occured",
    };
  }

  // supabase authentication from here
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return {
      error: true,
      message: "Email already in use",
    };
  }

  // User successfully created
  return {
    success: true,
    message: "Check your email for the confirmation link",
  };
};


// import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
// import { z } from "zod";
// import { createClient } from "@/utils/supabase/server";


// // supabse connection
// const supabase = createClient();

// // function  to generate 6 digit OTP
// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };
// // Function to send OTP to the phone number
// export const sendOtp = async (phone: string) => {
//   const authKey = process.env.NEXT_PUBLIC_AUTHKEY;
//   const otp = generateOTP();
//   const url = `https://api.authkey.io/request?${authKey}=authkey&mobile=${phone}&country_code=91&sid=15179&company=MamlaKaro&var=shrey&time=10`;

//   const { error: deleteError } = await supabase
//     .from("otps")
//     .delete()
//     .eq("phonenumber", phone);

//   if (deleteError) {
//     return { message: "Failed to delete existing OTPs", error: true };
//   }

//   const { data, error } = await supabase
//     .from("otps")
//     .insert([
//       {
//         phonenumber: phone,
//         otpCode: otp,
//       },
//     ])
//     .single();

//   if (error) {
//     console.log(error);
//     return { error: true, message: "Failed to save OTP" };
//   }

//   try {
//     const response = await axios.post(url);
//     console.log(response);

//     if (response.data.status === "success") {
//       return {
//         success: true,
//         message: "OTP sent successfully",
//       };
//     } else {
//       return {
//         error: true,
//         message: response.data.message || "Failed to send OTP",
//       };
//     }
//   } catch (err) {
//     const axiosError = err as AxiosError; // Type assertion
//     return {
//       error: true,
//       message:
//         axiosError.response?.data?.message || "Error occurred while sending OTP",
//     };
//   }
// };
// // Function to verify OTP
// export const verifyOtp = async (phone: string, otp: string) => {
//   try {
//     const { data, error } = await supabase
//       .from("otps")
//       .select("*")
//       .eq("phonenumber", phone)
//       .single();

//     if (error || !data) {
//       return { error: true, message: "OTP not found for this phone number" };
//     }

//     // Check OTP expiration
//     if (new Date(data.expiresAt) < new Date()) {
//       return { error: true, message: "OTP has expired" };
//     }

//     // Verify OTP
//     if (data.otpCode === otp) {
//       // Delete OTP after successful verification
//       await supabase.from("otps").delete().eq("phoneNumber", phoneNumber);
//       return {
//         success: true,
//         message: "Phone number verified",
//       };
//     }
//   } catch (err) {
//     const axiosError = err as AxiosError;
//     return {
//       error: true,
//       message:
//       axiosError.response?.data?.message|| "Error occurred while verifying OTP",
//     };
//   }
// };

// // export const registerUser = async ({
// //   email,
// //   password,
// //   passwordConfirm,
// //   phone,
// // }: {
// //   email: string;
// //   password: string;
// //   passwordConfirm: string;
// //   phone: string;
// // }) => {
// //   // Validate input data
// //   const newUserSchema = z
// //     .object({
// //       email: z.string().email(),
// //       phone: z.string().length(13), // phone number should be of length +91-XXXXXXXXXX
// //     })
// //     .and(passwordMatchSchema);

// //   const newUserValidation = newUserSchema.safeParse({
// //     email,
// //     phone,
// //     password,
// //     passwordConfirm,
// //   });

// //   if (!newUserValidation.success) {
// //     return {
// //       error: true,
// //       message: newUserValidation.error.issues[0]?.message ?? "An error occurred",
// //     };
// //   }

// //   // Step 1: Proceed with user registration logic after OTP verification
// //   const supabase = createClient();

// //   const { data, error } = await supabase.auth.signUp({
// //     email,
// //     password,
// //   });

// //   if (error) {
// //     return {
// //       error: true,
// //       message: error.message,
// //     };
// //   }

// //   if (data.user && data.user.identities && data.user.identities.length === 0) {
// //     return {
// //       error: true,
// //       message: "Email already in use",
// //     };
// //   }

// //   return {
// //     success: true,
// //     message: "Check your email for the confirmation link",
// //   };
// // };
// export const registerUser = async ({
//   email,
//   password,
//   passwordConfirm,
//   phone,
// }: {
//   email: string;
//   password: string;
//   passwordConfirm: string;
//   phone: string;
// }) => {
//   // Validate input data
//   const newUserSchema = z
//     .object({
//       email: z.string().email(),
//       phone: z.string().length(10), // phone number should be of length +91-XXXXXXXXXX
//     })
//     .and(passwordMatchSchema);

//   const newUserValidation = newUserSchema.safeParse({
//     email,
//     phone,
//     password,
//     passwordConfirm,
//   });
//   console.log(newUserValidation);

//   if (!newUserValidation.success) {
//     console.log("here");
//     return {
//       error: true,
//       message:
//         newUserValidation.error.issues[0]?.message ?? "An error occurred",
//     };
//   }

//   // Step 1: Check if the phone number is already associated with another user

//   const { data: existingUser, error: phoneCheckError } = await supabase
//     .from("users") // Replace "users" with your actual table name
//     .select("email")
//     .eq("phone", phone)
//     .single(); // Assuming the phone number is unique per user

//   if (phoneCheckError && phoneCheckError.code !== "PGRST116") {
//     // PGRST116 is "No rows found", which is not an error in this case
//     return {
//       error: true,
//       message: "An error occurred while checking phone number availability",
//     };
//   }

//   if (existingUser) {
//     return {
//       error: true,
//       message: "This phone number is already associated with another account",
//     };
//   }

//   // Step 2: Proceed with user registration logic after OTP verification
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//   });

//   if (error) {
//     return {
//       error: true,
//       message: error.message,
//     };
//   }

//   if (data.user && data.user.identities && data.user.identities.length === 0) {
//     return {
//       error: true,
//       message: "Email already in use",
//     };
//   }

//   // Step 3: Update the user table with the phone number
//   const { error: insertError } = await supabase
//     .from("users") // Replace "users" with the actual table name
//     .insert({
//       id: data.user.id, // Use the Supabase Auth user ID
//       email,
//       phone,
//     });

//   if (insertError) {
//     return {
//       error: true,
//       message:
//         "User registered, but failed to insert user data into the database",
//     };
//   }

//   return {
//     success: true,
//     message: "Check your email for the confirmation link",
//   };
// };
