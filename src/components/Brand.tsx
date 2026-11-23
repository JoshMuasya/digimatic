import Image from "next/image";
import Link from "next/link";

export default function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="inline-flex w-fit items-center gap-3 rounded-sm">
      <Image src="/logo.png" width={38} height={33} alt="" className="shrink-0" />
      <span className="leading-none">
        <span className="block text-lg font-bold tracking-tight text-foreground">Digimatic</span>
        <span className="mt-1 block text-[0.65rem] font-semibold tracking-[0.22em] text-secondary uppercase">
          Marketers
        </span>
      </span>
    </Link>
  );
}
