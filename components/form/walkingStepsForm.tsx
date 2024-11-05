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
import {
  saveSleepDuration,
  saveWalkingSteps,
} from "@/actions/inputMetricsAction"
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
import { walkingStepsSchema } from "@/config/walkingStepsSchema"

export default function WalkingStepsForm({ userId }: { userId: string }) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<z.infer<typeof walkingStepsSchema>>({
    resolver: zodResolver(walkingStepsSchema),
    defaultValues: {
      steps: undefined,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form

  async function onSubmit(values: z.infer<typeof walkingStepsSchema>) {
    const result = walkingStepsSchema.safeParse(values)
    if (!result.success) {
      return
    }
    const steps = result.data.steps

    try {
      const res = await saveWalkingSteps(steps, userId)
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
          <DialogTitle>Add Walking Steps</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="steps"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Enter walking steps"
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
