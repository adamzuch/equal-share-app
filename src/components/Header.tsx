import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Logo size={24} />
          <h1 className="text-3xl font-bold font-montserrat-alt">
            equal share
          </h1>
        </div>
        <ThemeToggle />
      </div>
      <p className="text-sm">
        Effortlessly split group expenses and instantly settle debts.
      </p>
    </div>
  )
}
