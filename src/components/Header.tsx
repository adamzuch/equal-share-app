import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

import { Logo } from '@/components/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'

export function Header() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Logo size={24} />
          <h1 className="text-3xl font-bold font-montserrat tracking-wide">
            equal share
          </h1>
        </div>
        <ThemeToggle />
      </div>
      <p className="text-sm">
        Effortlessly split group expenses and instantly settle debts.{' '}
        <a
          href="?contributions=example"
          className={cn(
            buttonVariants({ variant: 'link' }),
            'p-0 h-fit inline-flex items-center gap-1'
          )}
          target="_blank"
        >
          See an example
        </a>
        .
      </p>
    </div>
  )
}
