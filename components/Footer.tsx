export default function Footer() {
  return (
    <footer className="border-t border-cool/10 bg-cool text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm flex flex-col md:flex-row justify-between gap-4">
        <div>
          <div className="font-headline text-lg font-bold text-joy">WHIZZO</div>
          <p className="mt-1 opacity-80">Playful Engineering · A Mindarch Innovations brand</p>
        </div>
        <div className="opacity-70">
          © {new Date().getFullYear()} Whizzolabs. Educational wooden toys.
        </div>
      </div>
    </footer>
  );
}
