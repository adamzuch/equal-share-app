import { DefaultValues, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import currency from 'currency.js'

import { Input } from '@/components/ui/input'
import { AutocompleteInput } from '@/components/ui/autocomplete'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import type { ContributionType } from '@/lib/calculate-summary'
import { ContributionPreview } from '@/components/ContributionPreview'

import type { ContributionForm } from './contribution-schema'
import { contributionSchema } from './contribution-schema'

export function NewContribution({
  contributors,
  onSubmit,
}: {
  contributors: string[]
  onSubmit?: (contribution: ContributionType) => void
}) {
  const formDefaultValues: DefaultValues<ContributionForm> = {
    // tell TS to shut up. It needs to be an empty string initially to get the behavior we want
    amount: '' as never,
    contributor: '',
    description: '',
  }

  const form = useForm<ContributionForm>({
    resolver: zodResolver(contributionSchema),
    defaultValues: formDefaultValues,
  })

  function handleSubmit(data: ContributionForm) {
    const amount = currency(data.amount).value
    const contributor = data.contributor
    const description = data.description ?? ''

    const contribution = { amount, contributor, description }

    onSubmit?.(contribution)

    form.reset()
    document.getElementById('amount')?.focus()
  }

  const contributor = useWatch({
    control: form.control,
    name: 'contributor',
    defaultValue: formDefaultValues.contributor,
  })

  const amount = useWatch({
    control: form.control,
    name: 'amount',
    defaultValue: formDefaultValues.amount,
  })

  const description = useWatch({
    control: form.control,
    name: 'description',
    defaultValue: formDefaultValues.description,
  })

  const showPreview =
    amount !== ('' as never) && amount >= 0 && contributor !== ''

  return (
    <Form {...form}>
      <form
        className="font-work-sans flex flex-col gap-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="w-full flex flex-col gap-6 sm:flex-row sm:gap-3">
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="w-24">
                  <FormLabel htmlFor="amount">Amount</FormLabel>
                  <FormControl>
                    <div className="relative flex">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-20">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <Input
                        {...field}
                        id="amount"
                        autoComplete="off"
                        className="pl-7"
                        placeholder="0.00"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex-1">
              <FormField
                control={form.control}
                name="contributor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="contributor">Contributor</FormLabel>
                    <FormControl>
                      <AutocompleteInput
                        {...field}
                        id="contributor"
                        options={contributors}
                        placeholder="Enter name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">
                    Description (optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="description"
                      autoComplete="off"
                      className="w-full"
                      placeholder="Describe contribution"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {showPreview ? (
          <div className="space-y-2">
            <div className="text-sm font-medium leading-none">Preview</div>
            <ContributionPreview
              contribution={{
                amount: currency(amount).value,
                contributor,
                description: description ?? '',
              }}
            />
          </div>
        ) : null}

        <div className="flex flex-row-reverse items-center justify-start gap-3">
          <Button type="submit" variant="default">
            Add contribution
          </Button>
          <Button type="reset" variant="secondary" onClick={() => form.reset()}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
