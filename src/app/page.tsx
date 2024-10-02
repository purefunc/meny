import Link from "next/link";

import { CheckCircle, ChefHat, Smartphone, Utensils } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <a className="flex items-center justify-center" href="#">
          <ChefHat className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">Meny</span>
        </a>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          {/* <a
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Features
          </a>
          <a
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Pricing
          </a>
          <a
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            About
          </a>
          <a
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Contact
          </a> */}
          <Button>
            <Link href="/login">Login</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Create Beautiful Digital Menus With Meny
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Easily design and manage your restaurant&apos;s menu.
                  Accessible on any mobile device for your customers.
                </p>
              </div>
              <div className="space-x-4">
                <Button>
                  <Link href="/login">Get Started</Link>
                </Button>
                {/* <Button variant="outline">Learn More</Button> */}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
              Key Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Smartphone className="mb-2 h-6 w-6" />
                  <CardTitle>Mobile-Friendly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Optimized for viewing on smartphones and tablets.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Utensils className="mb-2 h-6 w-6" />
                  <CardTitle>Easy Customization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Quickly update menu items, prices, and descriptions.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CheckCircle className="mb-2 h-6 w-6" />
                  <CardTitle>Real-Time Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Changes reflect immediately on customer-facing menus.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
              How It Works
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  1
                </div>
                <h3 className="mt-4 text-xl font-bold">Sign Up</h3>
                <p className="mt-2 text-gray-500">
                  Create your account and set up your restaurant profile.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  2
                </div>
                <h3 className="mt-4 text-xl font-bold">Design Your Menu</h3>
                <p className="mt-2 text-gray-500">
                  Use our intuitive interface to add items and customize your
                  menu.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  3
                </div>
                <h3 className="mt-4 text-xl font-bold">Share with Customers</h3>
                <p className="mt-2 text-gray-500">
                  Publish your menu and share the link with your customers.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
              What Our Customers Say
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Amazing Product</CardTitle>
                  <CardDescription>Restaurant Owner</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    "Meny has revolutionized how we manage our menu. It's so
                    easy to use and our customers love it!"
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Increased Sales</CardTitle>
                  <CardDescription>Café Manager</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    "Since using Meny, we've seen a 20% increase in sales. The
                    mobile-friendly menus are a game-changer."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>User-Friendly</CardTitle>
                  <CardDescription>Food Truck Owner</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    "As a small business owner, Meny has made it incredibly easy
                    to keep my menu up-to-date on the go."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}
        {/* <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Pricing Plans
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Choose the plan that fits your restaurant's needs. Save with our
                annual billing option!
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <CardDescription>
                    Perfect for small restaurants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center space-x-4">
                    <p className="text-4xl font-bold">
                      $4.99<span className="text-lg">/mo</span>
                    </p>
                    <p className="text-4xl font-bold">
                      $49<span className="text-lg">/yr</span>
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      One menu
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Up to 50 menu items
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Basic customization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Email support
                    </li>
                  </ul>
                  <Button className="mt-6 w-full">Choose Plan</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For growing businesses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center space-x-4">
                    <p className="text-4xl font-bold">
                      $19<span className="text-lg">/mo</span>
                    </p>
                    <p className="text-4xl font-bold">
                      $199<span className="text-lg">/yr</span>
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Multiple menus
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Unlimited menu items
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Advanced customization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Priority support
                    </li>
                  </ul>
                  <Button className="mt-6 w-full">Choose Plan</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}
        <section className="w-full bg-blue-100 py-12 dark:bg-blue-900 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-blue-800 dark:text-blue-100 sm:text-4xl md:text-5xl">
                Ready to Create Your Digital Menu?
              </h2>
              <p className="max-w-[600px] text-xl text-blue-600 dark:text-blue-200">
                Join thousands of restaurants already using Meny to streamline
                their menu management.
              </p>
              <Button size="lg" asChild>
                <Link href="/login">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Meny. All rights reserved.
        </p>
        {/* <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <a className="text-xs underline-offset-4 hover:underline" href="#">
            Terms of Service
          </a>
          <a className="text-xs underline-offset-4 hover:underline" href="#">
            Privacy
          </a>
        </nav> */}
      </footer>
    </div>
  );
}
