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
          'absolute mt-1.5 shadow max-h-60 w-full overflow-y-auto overflow-x-hidden rounded-md border-border border bg-background focus:outline-none',
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
                'py-1.5 px-3 relative cursor-default select-none truncate',
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
