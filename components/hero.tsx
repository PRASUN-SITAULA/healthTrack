import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Activity, Utensils, Moon } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="relative w-full overflow-hidden py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Track Your Health, Transform Your Life
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  HealthTracker helps you monitor your vital stats, diet, and
                  sleep patterns to improve your overall well-being.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/dashboard">
                  <Button>Get Started</Button>
                </Link>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-blue-200 py-12 dark:bg-cyan-950 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
              Key Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <Activity className="mb-2 h-6 w-6 text-primary" />
                  <CardTitle>Activity Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Monitor your daily steps, workouts, and calorie burn.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Heart className="mb-2 h-6 w-6 text-red-500" />
                  <CardTitle>Heart Rate Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Keep track of your heart rate during rest and exercise.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Utensils className="mb-2 h-6 w-6 text-green-500" />
                  <CardTitle>Nutrition Logging</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Log your meals and track your nutritional intake.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Moon className="mb-2 h-6 w-6 text-blue-500" />
                  <CardTitle>Sleep Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Analyze your sleep patterns for better rest.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Start Your Health Journey Today
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who have transformed their lives with
                  HealthTracker.
                </p>
              </div>
              <Button size="lg">Sign Up Now</Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Vital. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
