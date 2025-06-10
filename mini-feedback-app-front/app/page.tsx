import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-12 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-[#313131] dark:text-white">Collect Valuable Feedback</h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Create feedback requests and share them with your audience. Get insights that matter.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-purple-500 hover:bg-purple-600">
              <Link href="/login">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          <div className="relative w-full max-w-4xl rounded-lg bg-white dark:bg-gray-700 p-4 shadow-lg ">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <div className="rounded-lg bg-purple-100 p-4">
                  <h3 className="font-medium text-purple-900">Create Feedback Requests</h3>
                  <p className="text-sm text-purple-700">
                    Easily create and manage feedback requests for your products or services.
                  </p>
                </div>
                <div className="rounded-lg bg-blue-100 p-4">
                  <h3 className="font-medium text-blue-900">Share with Anyone</h3>
                  <p className="text-sm text-blue-700">
                    Share your feedback request link with anyone to collect valuable insights.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-lg bg-pink-100 p-4">
                  <h3 className="font-medium text-pink-900">Analyze Responses</h3>
                  <p className="text-sm text-pink-700">
                    View and analyze all feedback responses in one convenient dashboard.
                  </p>
                </div>
                <div className="rounded-lg bg-green-100 p-4">
                  <h3 className="font-medium text-green-900">Improve Your Offering</h3>
                  <p className="text-sm text-green-700">Use the insights to improve your products and services.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
