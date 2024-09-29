import Link from "next/link";

import { Clock, Eye, EyeOff, Pencil } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MenuCard({ menu }) {
  return (
    <Card className="sm:max-w-xl">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>{menu.name}</CardTitle>
            <Badge variant={menu.isPublic ? "default" : "outline"}>
              {menu.isPublic ? (
                <Eye className="mr-2 h-4 w-4" />
              ) : (
                <EyeOff className="mr-2 h-4 w-4" />
              )}
              {menu.isPublic ? "Public" : "Private"}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="outline">
              <Link href={`/menus/${menu.id}`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href={`/menu/${menu.id}`} target="_blank">
                View
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          {menu.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-end gap-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4" />
          Updated: {new Date(menu.updatedAt).toLocaleDateString()}
        </div>
      </CardFooter>
    </Card>
  );
}
