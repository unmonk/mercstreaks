import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomeCTA() {
  return (
    <section className="bg-gray-900 text-white">
      <div className="px-4 py-24 lg:flex lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-slate-500 to-green-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Merc for the Cash.
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Welcome to MercStreaks! Sign up and start your streak today.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/signup">
              <Button variant="default" size="lg">
                Get Started
              </Button>
            </Link>
            <Button variant="secondary" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
