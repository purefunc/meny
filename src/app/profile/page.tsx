import { getServerSession } from "next-auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import options from "@/config/auth";
import requireAuth from "@/utils/require-auth";

export default async function Profile() {
  await requireAuth();
  const session = (await getServerSession(options))!;

  return (
    <Card className="mt-4 max-w-md">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Your profile information is managed by Google and cannot be changed
          here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input disabled value={session?.user?.name || ""} />
        </div>
        <div>
          <Label>Email</Label>
          <Input disabled value={session?.user?.email || ""} />
        </div>
      </CardContent>
    </Card>
  );
}
