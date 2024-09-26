import { Card, CardContent } from "@/components/ui/card";

export default async function Home() {
  return (
    <Card className="mx-auto mt-4 max-w-md">
      <CardContent className="text-center">
        <h1 className="text-5xl">Home Page</h1>
        <p className="text-xl">Coming Soon</p>
      </CardContent>
    </Card>
  );
}
