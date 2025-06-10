"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getFeedbackRequestById } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Copy, Calendar, MessageSquare } from "lucide-react"

interface Feedback {
  _id: string
  authorName: string
  text: string
  createdAt: string
}

interface FeedbackRequest {
  _id: string
  title: string
  description: string
  slug: string
  createdAt: string
  feedbacks: Feedback[]
}
import { use } from "react"

export default function FeedbackRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const [feedbackRequest, setFeedbackRequest] = useState<FeedbackRequest | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchFeedbackRequest = async () => {
      try {
        const data = await getFeedbackRequestById(id)
        setFeedbackRequest(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch feedback request")
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeedbackRequest()
  }, [id])

  const copyFeedbackLink = () => {
    if (!feedbackRequest) return

    const link = `${window.location.origin}/create/feedback?slug=${feedbackRequest.slug}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (isLoading) {
    return (
      <div className="container mx-auto flex h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600 mx-auto"></div>
          <p>Loading feedback request...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </div>
    )
  }

  if (!feedbackRequest) {
    return (
      <div className="container mx-auto p-4 py-8">
        <Alert>
          <AlertDescription>Feedback request not found</AlertDescription>
        </Alert>
        <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <Button
        variant="ghost"
        onClick={() => router.push("/dashboard")}
        className="mb-6 flex items-center text-gray-500"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">{feedbackRequest.title}</h1>
        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            Created on {formatDate(feedbackRequest.createdAt)}
          </div>
          <div className="flex items-center">
            <MessageSquare className="mr-1 h-4 w-4" />
            {feedbackRequest.feedbacks.length} {feedbackRequest.feedbacks.length === 1 ? "response" : "responses"}
          </div>
        </div>
        <p className="mb-6 text-gray-600">{feedbackRequest.description}</p>
        <Button onClick={copyFeedbackLink} className="bg-purple-500 hover:bg-purple-600">
          <Copy className="mr-2 h-4 w-4" />
          {copied ? "Copied!" : "Copy Feedback Link"}
        </Button>
      </div>

      <div className="mb-4">
        <h2 className="mb-4 text-2xl font-semibold">Feedback Responses</h2>
        {feedbackRequest.feedbacks.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No feedback responses yet. Share your feedback link to collect responses.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {feedbackRequest.feedbacks.map((feedback) => (
              <Card key={feedback._id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{feedback.authorName}</CardTitle>
                  <CardDescription>{formatDate(feedback.createdAt)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{feedback.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
