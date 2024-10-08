"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { SubmitButton } from "@/components/submit-button"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { useToast } from "@/components/hooks/use-toast"
import { signin } from "@/actions/auth"
import { isActionError } from "@/utils/error"
import { useRouter } from "next/navigation"
import { signInUserSchema } from "@/config/signInUserSchema"

export function UserSignInForm() {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof signInUserSchema>>({
    resolver: zodResolver(signInUserSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  async function onSubmit(data: z.infer<typeof signInUserSchema>) {
    try {
      console.log("I am clicked")
      const res = await signin(data)
      if (isActionError(res)) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: res.success,
          variant: "default",
        })
        router.push("/")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `An unexpected error occurred. ${error}`,
        variant: "destructive",
      })
    } finally {
      // setTimeout(() => reset(), 100) // Reset the form state after submission attempt
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col items-center justify-center gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Enter your Email"
                  className="input input-bordered"
                  {...field}
                />
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
                <Input
                  placeholder="Enter your password"
                  className="input input-bordered"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full justify-center">
          <SubmitButton
            type="submit"
            pending={isSubmitting}
            pendingText="Signing In"
          >
            Sign In
          </SubmitButton>
        </div>
      </form>
    </Form>
  )
}
