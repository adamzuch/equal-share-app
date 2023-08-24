import * as React from 'react'

import { cn } from '@/lib/utils'

import { Input } from './input'
import { Card } from './card'
import { on } from 'events'

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
      ...props
    }: AutocompleteProps,
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState('')

    const [activeIndex, setActiveIndex] = React.useState(-1)

    const options = allOptions.filter((option) =>
      option.toLowerCase().includes(query.toLowerCase())
    )
    // const filteredOptions = options

    console.log('open', open)
    console.log('query', query)
    console.log('options', options)
    // console.log('activeIndex', activeIndex)

    const handleAutocompleteChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      console.log('change', e.target.value)
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

    const handleOptionSelect = () => {
      onOptionSelect?.(options[activeIndex])
      setQuery('')
      setOpen(false)
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
            if (
              activeIndex > -1 &&
              activeIndex < options.length &&
              e.key === 'Enter'
            ) {
              e.preventDefault()
              console.log('enter')
              handleOptionSelect()
            }

            if (activeIndex > -1 && e.key === 'ArrowUp') {
              console.log('arrow up')
              setActiveIndex(activeIndex - 1)
            }
            if (activeIndex < options.length - 1 && e.key === 'ArrowDown') {
              console.log('arrow down')
              setActiveIndex(activeIndex + 1)
            }
          }}
        />
        {open && options.length > 0 ? (
          <Card className="p-3 flex flex-col gap-3">
            {options.map((option, i) => (
              <option
                className={cn(activeIndex === i ? 'bg-slate-400' : '')}
                key={option}
                onClick={() => {
                  handleOptionSelect()
                }}
              >
                {option}
              </option>
            ))}
          </Card>
        ) : null}
      </>
    )
  }
)

export { Autocomplete }
