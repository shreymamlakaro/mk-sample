"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerUser } from "./action";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const formSchema = z
  .object({
    email: z.string().email(),
  })
  .and(passwordMatchSchema);

export default function Register() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError(null);
    setIsLoading(true); 

    try {
      const response = await registerUser({
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });

      if (response.error) {
        setServerError(response.message);
      } else {
        // Redirect to the confirmation page
        router.push("/register/confirmation");
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Set loading to false when submission ends
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Register for a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password confirm</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {serverError && (
                <p className="text-red-500 text-sm mt-2">{serverError}</p>
              )}
              {/* <Button type="submit">Register</Button> */}
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <div className="text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}









// code with otp implementation
/* eslint-disable @typescript-eslint/no-unused-vars */

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { registerUser, sendOtp, verifyOtp } from "./action"; // Assuming actions are updated
// import { useRouter } from "next/navigation";
// import { Loader2 } from "lucide-react";
// import Link from "next/link";

// const formSchema = z
//   .object({
//     email: z.string().email(),
//     phone: z.string().min(10, "Phone number is required").max(10, "Phone number must be 10 digits"),
//   })
//   .and(passwordMatchSchema);

// export default function Register() {
//   const [serverError, setServerError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false); // Add loading state
//   const [otpSent, setOtpSent] = useState(false); // Flag to check if OTP is sent
//   const [isPhoneVerified, setIsPhoneVerified] = useState(false); // Flag to check if phone is verified
//   const [otp, setOtp] = useState(""); // Store OTP
//   const router = useRouter();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       phone: "",
//       password: "",
//       passwordConfirm: "",
//     },
//   });

//   const handleSubmit = async (data: z.infer<typeof formSchema>) => {
//     setServerError(null);
//     setIsLoading(true); // Set loading to true when submission starts

//     try {
//       if (!isPhoneVerified) {
//         setServerError("Please verify your phone number before signing up.");
//         return;
//       }

//       const response = await registerUser({
//         email: data.email,
//         password: data.password,
//         phone:data.phone,
//         passwordConfirm: data.passwordConfirm,
//       });

//       if (response.error) {
//         setServerError(response.message);
//       } else if(response?.success == true){
//         // Redirect to the confirmation page
//         router.push("/register/confirmation");
//       }
//     } catch (error) {
//       setServerError("An unexpected error occurred. Please try again.");
//     } finally {
//       setIsLoading(false); // Set loading to false when submission ends
//     }
//   };

//   const handleSendOtp = async () => {
//     const phoneNumber = `${form.getValues().phone}`;
//     try {
//       setIsLoading(true);
//      const response = await sendOtp(phoneNumber); 
     
//       if(response.error){
//         setServerError(response.message);
//       }else  setOtpSent(true);
//     } catch (error) {
//       setServerError("Failed to send OTP. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     try {
//       setIsLoading(true);
//       const isValidOtp = await verifyOtp(form.getValues().phone, otp);
//       if (isValidOtp.error) {
//         setServerError("Invalid OTP. Please try again.");      
//       } else {
//         setIsPhoneVerified(true);
//         setServerError(null);
//       }
//     } catch (error) {
//       setServerError("Failed to verify OTP. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <main className="flex justify-center items-center min-h-screen">
//       <Card className="w-[380px]">
//         <CardHeader>
//           <CardTitle>Register</CardTitle>
//           <CardDescription>Register for a new account</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(handleSubmit)}
//               className="flex flex-col gap-2"
//             >
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
              
//               <FormField
//                 control={form.control}
//                 name="phone"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Phone No (+91)</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         maxLength={10}
//                         placeholder="Enter phone number"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {otpSent && !isPhoneVerified && (
//                 <FormField
//                   control={form.control}
//                   name="otp"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Enter OTP</FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           value={otp}
//                           onChange={(e) => setOtp(e.target.value)}
//                           maxLength={6}
//                           placeholder="Enter OTP"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               )}

//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input {...field} type="password" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="passwordConfirm"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password Confirm</FormLabel>
//                     <FormControl>
//                       <Input {...field} type="password" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {serverError && (
//                 <p className="text-red-500 text-sm mt-2">{serverError}</p>
//               )}

// {!otpSent ? (
//   <Button type="button" onClick={handleSendOtp} disabled={isLoading}>
//     {isLoading ? (
//       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//     ) : (
//       "Send OTP"
//     )}
//   </Button>
// ) : !isPhoneVerified ? (
//   <Button type="button" onClick={handleVerifyOtp} disabled={isLoading}>
//     {isLoading ? (
//       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//     ) : (
//       "Verify OTP"
//     )}
//   </Button>
// ) : null}

//               {isPhoneVerified && (
//                 <Button type="submit" disabled={isLoading || !isPhoneVerified}>
//                   {isLoading ? (
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   ) : (
//                     "Register"
//                   )}
//                 </Button>
//               )}
//             </form>
//           </Form>
//         </CardContent>
//         <CardFooter className="flex-col gap-2">
//           <div className="text-muted-foreground text-sm">
//             Already have an account?{" "}
//             <Link href="/login" className="underline">
//               Login
//             </Link>
//           </div>
//         </CardFooter>
//       </Card>
//     </main>
//   );
// }
