"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/submit-button"

const formSchema = z.object({
  amount: z
    .number({
      required_error: "Please enter an amount",
    })
    .min(1, "Amount must be at least 1 ml")
    .max(2000, "Amount cannot exceed 2000 ml"),
})

export default function WaterIntakeTracker() {
  const [waterIntake, setWaterIntake] = useState(0)
  const dailyGoal = 2000 // 2 liters in ml

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: undefined,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newIntake = Math.min(waterIntake + values.amount, dailyGoal)
    setWaterIntake(newIntake)
    form.reset()
  }

  const progress = Math.min((waterIntake / dailyGoal) * 100, 100)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Water Intake Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Enter water intake (ml)"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        className="flex-grow"
                      />
                      <SubmitButton type="submit">Add</SubmitButton>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
        <p className="mt-4 text-center">
          Total Intake: <span className="font-bold">{waterIntake} ml</span> /{" "}
          {dailyGoal} ml
        </p>
        {waterIntake >= dailyGoal && (
          <p className="mt-2 text-center font-semibold text-green-600">
            Congratulations! You &apos;ve reached your daily goal!
          </p>
        )}
      </CardContent>
    </Card>
  )
}
