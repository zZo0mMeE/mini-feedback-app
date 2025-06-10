"use client"

import { useAuth } from "./auth"

const API_BASE_URL = "http://localhost:3000"

export async function registerUser(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Registration failed")
  }

  return response.json()
}

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Login failed")
  }

  return response.json()
}

export async function getFeedbackRequests() {
  const { token } = useAuth.getState()

  if (!token) {
    throw new Error("Authentication required")
  }

  const response = await fetch(`${API_BASE_URL}/feedback-requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Failed to fetch feedback requests")
  }

  return response.json()
}

export async function createFeedbackRequest(title: string, description: string) {
  const { token } = useAuth.getState()

  if (!token) {
    throw new Error("Authentication required")
  }

  const response = await fetch(`${API_BASE_URL}/feedback-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Failed to create feedback request")
  }

  return response.json()
}

export async function getFeedbackRequestById(id: string) {
  const { token } = useAuth.getState()

  if (!token) {
    throw new Error("Authentication required")
  }

  const response = await fetch(`${API_BASE_URL}/feedback-requests/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Failed to fetch feedback request")
  }

  return response.json()
}

export async function deleteFeedbackRequest(id: string) {
  const { token } = useAuth.getState()

  if (!token) {
    throw new Error("Authentication required")
  }

  const response = await fetch(`${API_BASE_URL}/feedback-requests/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Failed to delete feedback request")
  }

  return response.json()
}

export async function submitFeedback(slug: string, text: string, authorName: string) {
  const response = await fetch(`${API_BASE_URL}/feedbacks/${slug}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, authorName }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Failed to submit feedback")
  }

  return response.json()
}
