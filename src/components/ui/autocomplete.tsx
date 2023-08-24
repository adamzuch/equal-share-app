import * as React from 'react'

import { cn } from '@/lib/utils'

import { Input } from './input'
import { Card } from './card'

export interface AutocompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  options?: string[]
  onOptionSelect?: (option: string) => void
}

const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      options: allOptions = [],
      onOptionSelect,
      onChange,
      onBlur,
      onFocus,
      onKeyDown,
      ...props
    }: AutocompleteProps,
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState('')

    const [activeIndex, setActiveIndex] = React.useState(-1)

    const options =
      query !== ''
        ? allOptions.filter((option) =>
            option.toLowerCase().includes(query.toLowerCase())
          )
        : []

    const handleAutocompleteChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setQuery(e.target.value)
      setOpen(e.target.value.length > 0)
      setActiveIndex(-1)
    }

    const handleAutocompleteFocus = (
      e: React.FocusEvent<HTMLInputElement, Element>
    ) => {
      setOpen(e.target.value.length > 0)
    }

    const handleAutocompleteBlur = () => {
      if (open) {
        setOpen(false)
      }
      if (activeIndex > -1) {
        setActiveIndex(-1)
      }
    }

    const selectOption = (selectedIndex: number) => {
      onOptionSelect?.(options[selectedIndex])
      setQuery('')
      setOpen(false)
    }

    const handleAutocompleteKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (
        activeIndex > -1 &&
        activeIndex < options.length &&
        e.key === 'Enter'
      ) {
        e.preventDefault()
        selectOption(activeIndex)
      }
      if (activeIndex > -1 && e.key === 'ArrowUp') {
        setActiveIndex(activeIndex - 1)
      }
      if (activeIndex < options.length - 1 && e.key === 'ArrowDown') {
        setActiveIndex(activeIndex + 1)
      }
    }

    return (
      <>
        <Input
          {...props}
          ref={ref}
          autoComplete="off"
          onChange={(e) => {
            handleAutocompleteChange(e)
            onChange?.(e)
          }}
          onFocus={(e) => {
            handleAutocompleteFocus(e)
            onFocus?.(e)
          }}
          onBlur={(e) => {
            handleAutocompleteBlur()
            onBlur?.(e)
          }}
          onKeyDown={(e) => {
            handleAutocompleteKeyDown(e)
            onKeyDown?.(e)
          }}
        />
        {open && options.length > 0 ? (
          <Card className="p-3 flex flex-col gap-3">
            {options.map((option, i) => (
              <button
                className={cn(
                  'text-left',
                  activeIndex === i ? 'bg-slate-100' : ''
                )}
                type="button"
                key={option}
                onMouseOver={() => {
                  setActiveIndex(i)
                }}
                onMouseLeave={() => {
                  setActiveIndex(-1)
                }}
                onClick={() => {
                  selectOption(i)
                }}
              >
                {option}
              </button>
            ))}
          </Card>
        ) : null}
      </>
    )
  }
)

export { Autocomplete }
