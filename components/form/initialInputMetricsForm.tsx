"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { SubmitButton } from "@/components/submit-button"

import {
  Form,
  FormControl,
  FormDescription,
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
import { inputMetricSchema } from "@/config/inputMetricSchema"
import { saveHealthMetric } from "@/actions/inputMetricsAction"

export function InitialInputMetricsForm({ userId }: { userId: string }) {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof inputMetricSchema>>({
    resolver: zodResolver(inputMetricSchema),
    defaultValues: {
      weight: 0,
      height: 0,
      bloodGlucoseLevel: 0,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  async function onSubmit(data: z.infer<typeof inputMetricSchema>) {
    try {
      const res = await saveHealthMetric(data, userId)
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
    <div className="flex w-2/3 items-center justify-center">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Weight(kgs)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your current Weight"
                      className="input input-bordered"
                      autoComplete="off"
                      {...field}
                      onChange={(e) => {
                        const value =
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        field.onChange(value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Height(cm)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your current Height"
                      className="input input-bordered"
                      autoComplete="off"
                      {...field}
                      onChange={(e) => {
                        const value =
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        field.onChange(value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bloodGlucoseLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Glucose</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Latest measured Blood Glucose"
                      className="input input-bordered"
                      autoComplete="off"
                      {...field}
                      onChange={(e) => {
                        const value =
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        field.onChange(value)
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Note: You can enter 0 if you have not taken any
                    measurements.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full justify-center">
            <SubmitButton
              type="submit"
              pending={isSubmitting}
              pendingText="Saving "
            >
              Save
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  )
}
