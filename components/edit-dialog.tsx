"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  heightSchema,
  weightSchema,
  bloodGlucoseSchema,
} from "@/config/inputMetricSchema"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/submit-button"
import { useState } from "react"
import { updateHealthMetric } from "@/actions/inputMetricsAction"
import { useToast } from "@/components/hooks/use-toast"
import { isActionError } from "@/utils/error"

const metricSchema = z.union([heightSchema, weightSchema, bloodGlucoseSchema])

export function EditHealthMetricDialog({
  metric,
  userId,
}: {
  metric: "height" | "weight" | "bloodGlucoseLevel"
  userId: string
}) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<z.infer<typeof metricSchema>>({
    resolver: zodResolver(metricSchema),
    defaultValues: {
      [metric]: undefined,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form

  async function onSubmit(data: z.infer<typeof metricSchema>) {
    try {
      const res = await updateHealthMetric(metric, data, userId)
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
        reset()
      }
      setIsOpen(false)
    } catch (error) {
      console.error("Submission error:", error)
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {metric}</DialogTitle>
          <DialogDescription>
            Update your current {metric.toLowerCase()}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name={metric}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {metric === "height"
                      ? "Height"
                      : metric === "bloodGlucoseLevel"
                        ? "Blood Glucose"
                        : "Weight"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Data"
                      className="input input-bordered"
                      {...field}
                      autoComplete="off"
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

            <DialogFooter>
              <SubmitButton
                type="submit"
                pending={isSubmitting}
                pendingText="Saving"
              >
                Save
              </SubmitButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
