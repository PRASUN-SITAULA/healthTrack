"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodUserSchema } from "@/config/zodUserSchema"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { dummySignInAction, signInAction } from "@/app/actions"

export function UserForm() {
  const form = useForm<z.infer<typeof zodUserSchema>>({
    resolver: zodResolver(zodUserSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form
  // function onSubmit(data: z.infer<typeof zodUserSchema>) {
  // }
  function onSubmit() {
    // return promise that resolves after 2 seconds
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(dummySignInAction)} className="space-y-8">
        <div className="flex items-center justify-center gap-2">
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter your name"
                className="input input-bordered"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row items-center justify-between gap-2">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-center gap-2">
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height(CM)</FormLabel>
                <Input
                  placeholder="Enter your height"
                  className="input input-bordered"
                  {...field}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? undefined : Number(e.target.value)
                    field.onChange(value)
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight(KG)</FormLabel>
                <Input
                  placeholder="Enter your weight"
                  className="input input-bordered"
                  {...field}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? undefined : Number(e.target.value)
                    field.onChange(value)
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full justify-center">
          <Button type="submit">
            {isSubmitting ? "Signing up..." : "Sign up"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
