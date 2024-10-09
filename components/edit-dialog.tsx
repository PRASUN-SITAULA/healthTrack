// "use client"
// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { inputMetricSchema } from "@/config/inputMetricSchema"

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"

// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Pencil } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { SubmitButton } from "@/components/submit-button"

// export function EditHealthMetricDialog({
//   metric,
// }: {
//   metric: "height" | "weight" | "bloodGlucose"
// }) {
//   const [isOpen, setIsOpen] = useState(false)

//   const form = useForm<z.infer<typeof inputMetricSchema>>({
//     resolver: zodResolver(inputMetricSchema),
//     defaultValues: {
//       height: 0,
//       weight: 0,
//       bloodGlucose: 0,
//     },
//   })

//   const {
//     handleSubmit,
//     formState: { isSubmitting },
//     reset,
//   } = form

//   async function onSubmit(data: z.infer<typeof inputMetricSchema>) {
//     try {
//       console.log("Form submitted", data)
//       // Your submission logic here
//       setIsOpen(false)
//     } catch (error) {
//       console.error("Submission error:", error)
//     }
//   }

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
//           <Pencil className="h-4 w-4" />
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Edit {metric}</DialogTitle>
//           <DialogDescription>
//             Update your current {metric.toLowerCase()}.
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//       <Form {...form}>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//           <FormField
//             control={form.control}
//             name={metric}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>
//                   {metric === "height"
//                     ? "Height"
//                     : metric === "bloodGlucose"
//                       ? "Blood Glucose"
//                       : "Weight"}
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Enter your Data"
//                     className="input input-bordered"
//                     {...field}
//                     onChange={(e) => {
//                       const value =
//                         e.target.value === ""
//                           ? undefined
//                           : Number(e.target.value)
//                       field.onChange(value)
//                     }}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <DialogFooter>
//             <SubmitButton
//               type="submit"
//               pending={isSubmitting}
//               pendingText="Saving"
//               onClick={reset()}
//             >
//               Save
//             </SubmitButton>
//           </DialogFooter>
//         </form>
//       </Form>
//     </Dialog>
//   )
// }
//
"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/submit-button"

const schema = z.object({
  height: z.number().min(0).max(300),
  weight: z.number().min(0).max(500),
  bloodGlucose: z.number().min(0).max(1000),
})

export function EditHealthMetricDialog({
  metric,
}: {
  metric: "height" | "weight" | "bloodGlucose"
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data)
    // Handle form submission
  }

  // const getFieldName = (metric: string): keyof FormData => {
  //   switch (metric) {
  //     case "Height":
  //       return "height"
  //     case "Weight":
  //       return "weight"
  //     case "Blood Glucose":
  //       return "bloodGlucose"
  //     default:
  //       console.log("Invalid metric")
  //       return "hello"
  //   }
  // }

  // const fieldName = getFieldName(metric)

  return (
    <Dialog>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={metric} className="text-right">
                {metric}
              </Label>
              <Input
                id={metric}
                type="number"
                className="col-span-3"
                placeholder={
                  metric === "weight"
                    ? "in kgs"
                    : metric === "bloodGlucose"
                      ? "in mg/dL"
                      : "in cm"
                }
                {...register(metric, { valueAsNumber: true })}
              />
            </div>
            {/* {errors[fieldName] && (
              <p className="text-sm text-red-500">
                {errors[fieldName]?.message}
              </p> */}
            {/* )} */}
          </div>
          <DialogFooter>
            <SubmitButton type="submit" pendingText="Saving">
              Save
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
