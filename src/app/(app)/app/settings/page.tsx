import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Settings() {
  return (
    <>
      <h1 className="text-3xl">Settings</h1>
      <div className="align-start flex justify-center">
        <div>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Coming Soon
            </CardTitle>
            <CardDescription>
              We&apos;re working on something awesome!
            </CardDescription>
          </CardHeader>
        </div>
      </div>
    </>
  );
}
