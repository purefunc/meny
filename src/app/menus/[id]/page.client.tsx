"use client";

import { useParams } from "next/navigation";

export default function MenuClient() {
  const { id } = useParams();
  return <div>MenuClient</div>;
}
