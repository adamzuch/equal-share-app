import * as z from 'zod'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'

import { type Contribution } from '../lib/equalize'
import { ContributionCard } from './ContributionCard'

import { AutocompleteInput } from './ui/autocomplete'

const formSchema = z.object({
  amount: z.coerce
    .number({
      invalid_type_error: 'Must be a number',
    })
    .nonnegative('Amount cannot be negative'),
  contributor: z.string().nonempty('Cannot be empty'),
  description: z.string().optional(),
})

export function NewContributionForm({
  contributors,
  onNewContribution,
}: {
  contributions: Contribution[]
  contributors: string[]
  onNewContribution?: (contribution: Contribution) => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // silly types won't let me set an empty number field :)
      amount: 0,
      contributor: '',
      description: '',
    },
  })

  function handleSubmit(data: z.infer<typeof formSchema>) {
    const amount = data.amount
    const contributor = data.contributor
    const description = data.description ?? ''

    const contribution = { amount, contributor, description }

    onNewContribution?.(contribution)

    form.reset()
    document.getElementById('amount')?.focus()
  }

  const contributor = useWatch({
    control: form.control,
    name: 'contributor',
    defaultValue: '',
  })

  const amount = useWatch({
    control: form.control,
    name: 'amount',
    defaultValue: 0,
  })

  const description = useWatch({
    control: form.control,
    name: 'description',
    defaultValue: '',
  })

  const showPreview = amount >= 0 && contributor !== ''

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
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
                        className="w-24 pl-7"
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
          <div className="mt-6">
            <ContributionCard
              contribution={{
                amount,
                contributor,
                description: description ?? '',
              }}
              isEditable={false}
            />
          </div>
        ) : null}

        <div className="mt-6 flex flex-row-reverse items-center justify-start gap-3">
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
