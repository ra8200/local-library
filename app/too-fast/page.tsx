import React from "react"

const page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
        <h1 className="font-bebas-neue text-5xl font-bold text-light-100">Whoa, Slow Down There.</h1>
        <p className="mt-3 text-center text-light-400 max-w-xl">
            Looks like you&apos;ve a little too eager. We&apos;ve put a temporary pause on your excitement. Wait a moment and try again after 1 minute, please.
        </p>
    </main>
  )
}

export default page