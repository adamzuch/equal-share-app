import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Contribution } from '@/lib/equalize'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Apple, Banana, Cat } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

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

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form
            className="flex flex-col gap-3"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="flex items-start gap-3">
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
                          placeholder="Enter a description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Avatar className="mt-8">
                <AvatarFallback>
                  <Cat />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="contributor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="contributor">Contributor</FormLabel>
                      <FormControl>
                        <>
                          <Input
                            {...field}
                            id="contributor"
                            list="contributors"
                            autoComplete="off"
                            placeholder="Enter a contributor"
                          />
                          <datalist id="contributors">
                            {Array.from(contributors.values()).map(
                              (contributor) => (
                                <option key={contributor}>{contributor}</option>
                              )
                            )}
                          </datalist>
                        </>
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        If the contributor doesn't exist yet, they will be
                        added. Names are case-sensitive.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button className="mt-6" variant="default" type="submit">
              Add contribution
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
