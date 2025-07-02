"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { submitFeedback } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Header from "@/components/header"

export default function SubmitFeedbackPage() {
  const [authorName, setAuthorName] = useState("")
  const [text, setText] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const slug = searchParams.get("slug")

  useEffect(() => {
    if (!slug) {
      setError("No feedback request specified")
    }
  }, [slug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!slug) {
      setError("No feedback request specified")
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      await submitFeedback(slug, text, authorName)
      setSuccess(true)
      setAuthorName("")
      setText("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit feedback")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b from-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Submit Feedback</CardTitle>
            <CardDescription>Your feedback is valuable and helps improve the service</CardDescription>
          </CardHeader>
          {success ? (
            <CardContent className="space-y-4">
              <Alert className="bg-green-50 text-green-800">
                <AlertDescription>Thank you for your feedback! It has been submitted successfully.</AlertDescription>
              </Alert>
              <div className="flex justify-center">
                <Button onClick={() => setSuccess(false)}>Submit Another Response</Button>
              </div>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {!slug && (
                  <Alert>
                    <AlertDescription>
                      Invalid feedback request link. Please check the URL and try again.
                    </AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    disabled={!slug || isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedback">Your Feedback<span className="text-red-500">*</span></Label>
                  <Textarea
                    id="feedback"
                    placeholder="Share your thoughts, suggestions, or feedback"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[150px]"
                    required
                    disabled={!slug || isLoading}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={!slug || isLoading}>
                  {isLoading ? "Submitting..." : "Submit Feedback"}
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </>
  )
}
