"use client"

import { Button } from "@/components/ui/button"
import { type ComponentProps } from "react"
import { useForm } from "react-hook-form"

type Props = ComponentProps<typeof Button> & {
  pendingText?: string
}

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  ...props
}: Props) {
  const {
    formState: { isSubmitting: pending },
  } = useForm()

  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {pending ? pendingText : children}
    </Button>
  )
}
