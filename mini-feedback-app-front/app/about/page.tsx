import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col items-center justify-center space-y-12 text-center">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-[#313131] dark:text-white">
                            About Our Mission
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                            We believe that every voice matters. Our platform empowers businesses and creators to collect meaningful
                            feedback and build better experiences.
                        </p>
                    </div>

                    <div className="relative w-full max-w-4xl rounded-lg bg-white dark:bg-gray-700 p-8 shadow-lg">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#313131] dark:text-white">Our Story</h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Founded with the vision of making feedback collection simple and effective, we've helped thousands of
                                    businesses understand their customers better. What started as a simple idea has grown into a
                                    comprehensive platform that bridges the gap between businesses and their audiences.
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="rounded-lg bg-purple-100 p-6">
                                    <h3 className="font-bold text-lg text-purple-900 mb-2">Simplicity First</h3>
                                    <p className="text-sm text-purple-700">
                                        We believe feedback collection shouldn't be complicated. Our intuitive interface makes it easy for
                                        anyone to create and share feedback requests.
                                    </p>
                                </div>
                                <div className="rounded-lg bg-blue-100 p-6">
                                    <h3 className="font-bold text-lg text-blue-900 mb-2">Privacy Focused</h3>
                                    <p className="text-sm text-blue-700">
                                        Your data and your users' privacy are our top priorities. We implement industry-leading security
                                        measures to protect all information.
                                    </p>
                                </div>
                                <div className="rounded-lg bg-pink-100 p-6">
                                    <h3 className="font-bold text-lg text-pink-900 mb-2">Actionable Insights</h3>
                                    <p className="text-sm text-pink-700">
                                        Raw feedback is just the beginning. We help you transform responses into actionable insights that
                                        drive real improvements.
                                    </p>
                                </div>
                                <div className="rounded-lg bg-green-100 p-6">
                                    <h3 className="font-bold text-lg text-green-900 mb-2">Community Driven</h3>
                                    <p className="text-sm text-green-700">
                                        Our platform grows and improves based on feedback from our own community. We practice what we
                                        preach.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <h2 className="text-2xl font-bold text-[#313131] dark:text-white">Why Choose Us?</h2>
                                <div className="grid gap-4 md:grid-cols-3 text-left">
                                    <div className="space-y-2">
                                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                                            1
                                        </div>
                                        <h4 className="font-semibold text-[#313131] dark:text-white">Easy Setup</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Create your first feedback request in under 2 minutes
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                                            2
                                        </div>
                                        <h4 className="font-semibold text-[#313131] dark:text-white">Real-time Analytics</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            See responses and insights as they come in
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                                            3
                                        </div>
                                        <h4 className="font-semibold text-[#313131] dark:text-white">Unlimited Sharing</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Share your feedback requests with unlimited users
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button asChild size="lg" className="bg-purple-500 hover:bg-purple-600">
                            <Link href="/login">Start Collecting Feedback</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/">Back to Home</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
