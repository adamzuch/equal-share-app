import React, { forwardRef, useState } from 'react'
import { Combobox } from '@headlessui/react'

type AutocompleteInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  options: string[]
  onChange?: (value: string | number | readonly string[]) => void
}

export const AutocompleteInput = forwardRef<
  HTMLInputElement,
  AutocompleteInputProps
>(({ options: options, value, onChange, ...props }, ref) => {
  const [query, setQuery] = useState('')

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return option.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={value} onChange={onChange}>
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
      <Combobox.Options className="absolute mt-1 max-h-60 w-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        {filteredOptions.map((option) => (
          <Combobox.Option key={option} value={option}>
            {option}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
})
