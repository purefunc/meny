import { ChefHat } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import GoogleButton from "./google-button";

export default async function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center">
            <ChefHat className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Welcome to Meny
          </CardTitle>
          <CardDescription className="text-center">
            Sign in or create an account to start managing your digital menu
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <GoogleButton />
        </CardContent>
        {/* <CardFooter>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <a
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter> */}
      </Card>
    </div>
  );
}
