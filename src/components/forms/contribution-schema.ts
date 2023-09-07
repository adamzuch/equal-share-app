import { z } from 'zod'

export const contributionSchema = z.object({
  amount: z
    .string()
    .nonempty('Cannot be empty')
    .pipe(
      z.coerce
        .number({ invalid_type_error: 'Must be a number' })
        .nonnegative('Amount cannot be negative')
    ),
  contributor: z.string().nonempty('Cannot be empty'),
  description: z.string().optional(),
})

export type ContributionForm = z.infer<typeof contributionSchema>
