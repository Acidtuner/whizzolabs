import { LOGO_SRC } from "@/lib/logo";

export default function Footer() {
  return (
    <footer className="border-t border-cool/10 bg-cool text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm flex flex-col md:flex-row justify-between gap-4 items-center md:items-start">
        <div>
          <img
            src={LOGO_SRC}
            alt="Whizzo"
            className="block h-12 w-auto max-w-[240px] object-contain object-left"
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
