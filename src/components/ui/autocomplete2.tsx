import { ForwardedRef, forwardRef, useState } from 'react'
import { Combobox } from '@headlessui/react'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'

type ContributorInputProps<N extends string> = {
  contributors: string[]
} & ControllerRenderProps<FieldValues, N>

const ContributorInputInner = <N extends string>(
  {
    contributors: allContributors,
    value: contributor,
    onChange,
  }: ContributorInputProps<N>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? allContributors
      : allContributors.filter((contributor) => {
          return contributor.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox
      value={contributor}
      onChange={(contributor) => {
        onChange(contributor)
      }}
    >
      <Combobox.Input
        ref={ref}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        autoComplete="off"
        onChange={(event) => {
          const contributor = event.target.value
          setQuery(contributor)
          onChange(contributor)
        }}
      />
      <Combobox.Options className="absolute mt-1 max-h-60 w-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        {query.length > 0 && !filteredPeople.includes(query) && (
          <Combobox.Option value={query}>
            New contributor "{query}"
          </Combobox.Option>
        )}
        {filteredPeople.map((person) => (
          <Combobox.Option key={person} value={person}>
            {person}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}

export const ContributorInput = forwardRef(ContributorInputInner)
