import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import type { transactionSchema } from '../schemas/transaction.shema';
import type z from 'zod';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { ExpenseCategory } from '@/features/expenses/types/expenses.types';

function TransactionsFormContent() {
  const { type = 'expense' } = useParams();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<z.infer<typeof transactionSchema>>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!type) navigate('expense', { replace: true });
  }, [type, navigate]);

  const onSubmit = async (data: z.infer<typeof transactionSchema>) => {
    console.log('Valid data:', data);
    // API call...
  };

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
              label="Vendor"
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
              label="Amount"
              onChange={(e) =>
                field.value ? field.onChange(Number(e.target.value)) : undefined
              }
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
              label="Date"
              format="YYYY/MM/DD"
              value={field.value ? dayjs(field.value) : null}
              onChange={(value) =>
                field.onChange(value ? value.toDate() : null)
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
                    label="Category"
                    error={!!errors.category}
                    helperText={errors.category?.message}
                    fullWidth
                  />
                )}
              />
            )}
          />
        )}

        {/* Description — span 2 */}
        <Box sx={{ gridColumn: '1 / -1' }}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
              />
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
