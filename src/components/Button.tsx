import clsx from 'clsx'

export function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        'font-poppins bg-green-300 shadow hover:bg-green-400 text-black text-xs font-bold py-1.5 px-4 rounded-lg',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
