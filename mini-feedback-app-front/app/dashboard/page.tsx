"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getFeedbackRequests, deleteFeedbackRequest } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Plus, Trash2, ExternalLink, Copy } from "lucide-react"

interface FeedbackRequest {
  _id: string
  title: string
  description: string
  slug: string
  createdAt: string
}

export default function DashboardPage() {
  const [feedbackRequests, setFeedbackRequests] = useState<FeedbackRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchFeedbackRequests = async () => {
      try {
        const data = await getFeedbackRequests()
        setFeedbackRequests(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch feedback requests")
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeedbackRequests()
  }, [])

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this feedback request?")) {
      try {
        await deleteFeedbackRequest(id)
        setFeedbackRequests((prev) => prev.filter((request) => request._id !== id))
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete feedback request")
      }
    }
  }

  const copyFeedbackLink = (slug: string) => {
    const link = `${window.location.origin}/create/feedback?slug=${slug}`
    navigator.clipboard.writeText(link)
    setCopiedSlug(slug)
    setTimeout(() => setCopiedSlug(null), 2000)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="container mx-auto p-4 py-8 ">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Feedback Requests</h1>
        <Button onClick={() => router.push("/dashboard/create")} className="bg-purple-500 hover:bg-purple-600">
          <Plus className="mr-2 h-4 w-4" /> Create New
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        </div>
      ) : feedbackRequests.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <p className="mb-4 text-center text-lg text-gray-500">
              You haven&apos;t created any feedback requests yet.
            </p>
            <Button onClick={() => router.push("/dashboard/create")}>Create Your First Request</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {feedbackRequests.map((request) => (
            <Card key={request._id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-1">{request.title}</CardTitle>
                <CardDescription>Created on {formatDate(request.createdAt)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-sm text-gray-500">{request.description}</p>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2 border-t p-4">
                <Button variant="outline" size="sm" onClick={() => copyFeedbackLink(request.slug)} className="flex-1">
                  {copiedSlug === request.slug ? (
                    "Copied!"
                  ) : (
                    <>
                      <Copy className="mr-1 h-4 w-4" /> Copy Link
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href={`/dashboard/request/${request._id}`}>
                    <ExternalLink className="mr-1 h-4 w-4" /> View
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(request._id)}
                  className="flex-1 text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="mr-1 h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
