import { FormProvider, useForm } from 'react-hook-form';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import type z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import AddRecordingSection from '@/features/add-recording/components/AddRecordingSection';
import { useAppSelector } from '@/store/hooks';
import { selectInitialTransactions } from '@/features/data/state/data.selectors';
import { transactionSchema } from '../schemas/transaction.shema';
import dayjs from 'dayjs';
import AppSection from '@/components/common/AppSection/AppSection';
import { useEffect } from 'react';

function AddTransactionsLayout() {
  const initialTransactions = useAppSelector(selectInitialTransactions);

  console.log({ initialTransactions });

  const { type } = useParams();

  const methods = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),

    defaultValues: {
      type: type as 'income' | 'expense',
      name: '',
      amount: undefined,
      date: dayjs('2025-07-31').toDate(),
      method: undefined,
      category: undefined,
      // MVP setting default date to a fixed date for easier testing
      description: '',
    },
  });

  useEffect(() => {
    if (type === 'income' || type === 'expense') {
      methods.setValue('type', type);
    }
  }, [type, methods]);

  const formType = methods.watch('type');

  useEffect(() => {
    if (formType === 'income') {
      methods.setValue('category', undefined);
    }
  }, [formType, methods]);

  const isValidTransactionType = (
    type?: string
  ): type is 'income' | 'expense' => type === 'income' || type === 'expense';

  if (!isValidTransactionType(type)) {
    return <Navigate to="expense" replace />;
  }

  return (
    <FormProvider {...methods}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AddRecordingSection />
        <AppSection>
          <Outlet /> {/* Renders TransactionsFormContent */}
        </AppSection>
      </LocalizationProvider>
    </FormProvider>
  );
}

export default AddTransactionsLayout;
