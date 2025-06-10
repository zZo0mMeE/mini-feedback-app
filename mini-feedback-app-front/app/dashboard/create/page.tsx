"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createFeedbackRequest } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft } from "lucide-react"

export default function CreateFeedbackRequestPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await createFeedbackRequest(title, description)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create feedback request")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6 flex items-center text-gray-500">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Create Feedback Request</CardTitle>
          <CardDescription>Create a new feedback request to share with your audience</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter a title for your feedback request"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what kind of feedback you're looking for"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[150px]"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Feedback Request"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
