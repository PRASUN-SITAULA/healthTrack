"use client"

import { useEffect } from "react"
import { useToast } from "@/components/hooks/use-toast"

interface ErrorHandlerProps {
  error: string | null
}

export function ErrorHandler({ error }: ErrorHandlerProps) {
  const { toast } = useToast()

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    }
  }, [error, toast])

  return null
}
