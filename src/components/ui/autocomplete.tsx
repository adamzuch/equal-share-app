import React, { forwardRef, useState } from 'react'
import { Combobox } from '@headlessui/react'
import { cn } from '@/lib/utils'

type AutocompleteInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  options: string[]
  onChange?: (value: string | number | readonly string[]) => void
}

export const AutocompleteInput = forwardRef<
  HTMLInputElement,
  AutocompleteInputProps
>(({ options, value, onChange, ...props }, ref) => {
  const [query, setQuery] = useState('')

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return option.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox as="div" className="relative" value={value} onChange={onChange}>
      <Combobox.Input
        {...props}
        ref={ref}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        autoComplete="off"
        onChange={(e) => {
          const value = e.target.value
          setQuery(value)
          onChange?.(value)
        }}
      />
      <Combobox.Options
        className={cn(
          'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          'mt-1.5 shadow max-h-60 w-full overflow-y-auto overflow-x-hidden focus:outline-none',
          filteredOptions.length === 0 || query === '' ? 'hidden' : ''
        )}
      >
        <Combobox.Option value={value} className="hidden" />
        {filteredOptions.map((option) => (
          <Combobox.Option
            key={option}
            value={option}
            className={({ active }) =>
              cn(
                'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                // 'py-1.5 px-3 relative cursor-default select-none truncate',
                active ? 'bg-accent text-accent-foreground' : ''
              )
            }
          >
            {option}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
})
