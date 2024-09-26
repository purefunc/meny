import { getServerSession } from "next-auth";

import { Card, CardContent } from "@/components/ui/card";
import options from "@/config/auth";
import requireAuth from "@/utils/require-auth";

export default async function Profile() {
  await requireAuth();
  const session = (await getServerSession(options))!;
  console.log("session", session);

  return (
    <Card className="mx-auto mt-4 max-w-md">
      <CardContent>{session?.user?.name}</CardContent>
    </Card>
  );
}
