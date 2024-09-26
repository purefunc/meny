import SideNav from "@/components/layout/side-nav";
import TopNav from "@/components/layout/top-nav";

export default function Nav({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <TopNav />
        {children}
      </div>
    </>
  );
}
