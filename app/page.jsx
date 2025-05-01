import Link from "next/link";
export default function Home() {
  return (
    <div className="w-[100%] h-screen bg-[url(/assets/images/cover.jpg)] bg-cover bg-center bg-fixed bg-no-repeat text-2xl">
        <Link href={"/system"} className="nav-to-sys">LETS GO</Link>
    </div>
  );
}
