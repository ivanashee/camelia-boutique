import Ornament from "@/components/Ornament";
import { loginAction } from "./actions";

export default function AdminLoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-5">
      <form
        action={loginAction}
        className="relative bg-cream border border-champagne rounded-2xl p-8 w-full max-w-sm overflow-hidden"
      >
        <div className="absolute -top-4 -right-4 opacity-30 pointer-events-none">
          <Ornament size={120} opacity={0.4} />
        </div>
        <div className="eyebrow mb-1">— Panel</div>
        <h1 className="font-serif text-3xl text-ink mb-6">Ingresar</h1>
        {searchParams?.error && (
          <div className="text-sm text-rose bg-blush/40 border border-rose/30 rounded-md px-3 py-2 mb-4">
            {searchParams.error}
          </div>
        )}
        <label className="label">Email</label>
        <input name="email" type="email" required className="input mb-4" />
        <label className="label">Contraseña</label>
        <input name="password" type="password" required className="input mb-6" />
        <button className="btn-primary w-full">Entrar</button>
        <p className="text-[11px] text-thyme mt-4">
          Usá el email y contraseña que creaste en Supabase Auth.
        </p>
      </form>
    </section>
  );
}
