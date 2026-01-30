import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
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

import type { transactionSchema } from '../schemas/transaction.shema';
import { ExpenseCategory } from '@/features/expenses/types/expenses.types';
import { PaymentMethod } from '../types/transaction.types';
import { formatPaymentMethod } from '@/shared/utils/formatters/formatPaymentMethods.utils';
import { useAppDispatch } from '@/store/hooks';
import { addTransaction } from '@/features/data/state/data.slice';
import { useTransactionToast } from '../hooks/useTransactionToast';
import type { InitialTransaction } from '@/features/data/types/initialData.types';

function TransactionsFormContent() {
  const { type = 'expense' } = useParams();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useFormContext<z.infer<typeof transactionSchema>>();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { showTransactionAdded } = useTransactionToast();

  useEffect(() => {
    if (!type) navigate('expense', { replace: true });
  }, [type, navigate]);

  const onSubmit = async (values: z.infer<typeof transactionSchema>) => {
    const year = dayjs(values.date).year();
    const month = dayjs(values.date).month();
    const normalizedDate = dayjs(values.date).format('YYYY-MM-DD');

    const transaction: InitialTransaction = {
      id: crypto.randomUUID(),
      type: values.type,
      name: values.name,
      category: values.category,
      method: values.method,
      date: normalizedDate,
      amount:
        values.type === 'expense'
          ? -Math.abs(values.amount)
          : Math.abs(values.amount),
      description: values.description,
      createdAt: new Date().toISOString(),
    };

    dispatch(
      addTransaction({
        year,
        month,
        transaction,
      })
    );

    showTransactionAdded({
      year,
      month,
      transaction,
    });

    reset();
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
