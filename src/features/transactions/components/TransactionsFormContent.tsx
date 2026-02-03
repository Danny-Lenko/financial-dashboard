import { Controller, useFormContext } from 'react-hook-form';
import type z from 'zod';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import MDEditor, { commands } from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';

import type { transactionSchema } from '../schemas/transaction.shema';
import { ExpenseCategory } from '@/features/expenses/types/expenses.types';
import { PaymentMethod } from '../types/transaction.types';
import { formatPaymentMethod } from '@/shared/utils/formatters/formatPaymentMethods.utils';
import { useOutletContext } from 'react-router-dom';
import { useSubmitTransaction } from '../hooks/useSubmitTransaction';

function TransactionsFormContent() {
  const { type } = useOutletContext<{ type: 'income' | 'expense' }>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useFormContext<z.infer<typeof transactionSchema>>();

  const onSubmit = useSubmitTransaction(reset);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
          },
          gap: 2,
        }}
      >
        {/* Name */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Vendor *"
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
            />
          )}
        />

        {/* Amount */}
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Amount *"
              value={field.value ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value === '' ? undefined : Number(value));
              }}
              error={!!errors.amount}
              helperText={errors.amount?.message}
              fullWidth
            />
          )}
        />

        {/* Date */}
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Date *"
              format="YYYY/MM/DD"
              value={field.value ? dayjs(field.value) : null}
              onChange={(value) =>
                field.onChange(value ? value.format('YYYY-MM-DD') : undefined)
              }
              // MVP setting fixed min and max dates for easier testing
              maxDate={dayjs('2025-07-31')}
              minDate={dayjs('2023-07-31')}
              slotProps={{
                desktopPaper: {
                  elevation: 4,
                },
                textField: {
                  fullWidth: true,
                  error: !!errors.date,
                  helperText: errors.date?.message,
                  readOnly: true,
                },
                yearButton: {
                  sx: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    lineHeight: 'normal',
                  },
                },
              }}
            />
          )}
        />

        {/* Category — only for expense */}
        {type === 'expense' && (
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Autocomplete
                options={Object.values(ExpenseCategory)}
                value={field.value || null}
                onChange={(_, value) => field.onChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category *"
                    error={!!errors.category}
                    helperText={errors.category?.message}
                    fullWidth
                  />
                )}
              />
            )}
          />
        )}

        {/* Method — span 2 */}
        <Box sx={{ gridColumn: '1 / -1' }}>
          <Controller
            name="method"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.method}>
                <FormLabel>Method *</FormLabel>

                <RadioGroup
                  row
                  value={field.value || ''}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  {Object.values(PaymentMethod).map((method) => (
                    <FormControlLabel
                      key={method}
                      value={method}
                      control={<Radio />}
                      label={formatPaymentMethod(method)}
                    />
                  ))}
                </RadioGroup>

                <FormHelperText>{errors.method?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        {/* Description — span 2 */}
        <Box sx={{ gridColumn: '1 / -1' }}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <div data-color-mode="light">
                <FormLabel sx={{ display: 'block', marginBottom: 1 }}>
                  Description
                </FormLabel>
                <MDEditor
                  value={field.value ?? ''}
                  onChange={(value) => field.onChange(value ?? '')}
                  preview="live"
                  previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                  }}
                  commands={[
                    commands.bold,
                    commands.italic,
                    commands.strikethrough,
                    commands.divider,
                    commands.heading2,
                    commands.heading3,
                    commands.divider,
                    commands.unorderedListCommand,
                    commands.orderedListCommand,
                    commands.divider,
                    commands.link,
                    commands.divider,
                    commands.help,
                  ]}
                />
              </div>
            )}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button type="submit" disabled={isSubmitting} variant="contained">
          Add {type === 'income' ? 'Income' : 'Expense'}
        </Button>
      </Box>
    </form>
  );
}
export default TransactionsFormContent;
