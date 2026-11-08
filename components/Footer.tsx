import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-cool/10 bg-cool text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm flex flex-col md:flex-row justify-between gap-4 items-center md:items-start">
        <div>
          <Image
            src="/whizzo-logo.png"
            alt="Whizzo"
            width={120}
            height={30}
            className="h-8 w-auto"
          />
          <p className="mt-2 opacity-80">Playful Engineering · A Mindarch Innovations brand</p>
        </div>
        <div className="opacity-70">
          © {new Date().getFullYear()} Whizzolabs. Educational wooden toys.
        </div>
      </div>
    </footer>
  );
}
