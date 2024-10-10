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
import { useEffect, useState } from "react"

// Function to get the appropriate schema
function getSchemaForMetric(metric: "height" | "weight" | "bloodGlucose") {
  switch (metric) {
    case "height":
      return heightSchema
    case "weight":
      return weightSchema
    case "bloodGlucose":
      return bloodGlucoseSchema
  }
}

export function EditHealthMetricDialog({
  metric,
}: {
  metric: "height" | "weight" | "bloodGlucose"
}) {
  const [isOpen, setIsOpen] = useState(false)
  const schema = getSchemaForMetric(metric)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      [metric]: 0,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      console.log("Form submitted", data)
      // Your submission logic here
      setIsOpen(false)
    } catch (error) {
      console.error("Submission error:", error)
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
                      : metric === "bloodGlucose"
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
