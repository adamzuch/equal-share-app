import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Footer() {
  return (
    <div className="w-full text-sm gap-3 flex justify-center items-center bg-secondary text-secondary-foreground p-3">
      <span>
        Created by{' '}
        <a
          className={cn(buttonVariants({ variant: 'link' }), 'px-0')}
          href="https://github.com/adamzuch"
        >
          adamzuch
        </a>
      </span>
      |
      <a
        className={cn(buttonVariants({ variant: 'link' }), 'px-0')}
        href="https://github.com/adamzuch/equal-share-app"
      >
        Source code on GitHub
      </a>
      |
      <a
        className={cn(buttonVariants({ variant: 'link' }), 'px-0')}
        href="https://github.com/adamzuch/equal-share-app"
      >
        Submit feedback
      </a>
    </div>
  )
}
