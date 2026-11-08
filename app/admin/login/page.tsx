export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cool/5">
      <div className="bg-white border border-cool/10 rounded-xl p-8 max-w-sm w-full">
        <h1 className="font-headline text-2xl font-bold mb-2">Admin Login</h1>
        <p className="text-sm text-cool/60 mb-6">
          Auth.js integration is next. For now, set <code>ADMIN_BYPASS=true</code> in development.
        </p>
        <form className="space-y-3">
          <input type="email" placeholder="Email" className="w-full border border-cool/20 rounded-lg px-3 py-2" />
          <input type="password" placeholder="Password" className="w-full border border-cool/20 rounded-lg px-3 py-2" />
          <button type="button" className="w-full bg-whizzo text-white py-2 rounded-lg">
            Sign in (coming soon)
          </button>
        </form>
      </div>
    </div>
  );
}
