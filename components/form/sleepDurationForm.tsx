"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
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
import { sleepDurationSchema } from "@/config/sleepDurationSchema"
import { isActionError } from "@/utils/error"
import { useToast } from "@/components/hooks/use-toast"
import { saveSleepDuration } from "@/actions/inputMetricsAction"
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
import { Plus } from "lucide-react"

export default function SleepDurationForm({ userId }: { userId: string }) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<z.infer<typeof sleepDurationSchema>>({
    resolver: zodResolver(sleepDurationSchema),
    defaultValues: {
      duration: undefined,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form

  async function onSubmit(values: z.infer<typeof sleepDurationSchema>) {
    const result = sleepDurationSchema.safeParse(values)
    if (!result.success) {
      return
    }
    const duration = result.data.duration

    try {
      const res = await saveSleepDuration(duration, userId)
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
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Sleep Duration</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Enter sleep duration (hours)"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        className="flex-grow"
                      />
                    </div>
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
