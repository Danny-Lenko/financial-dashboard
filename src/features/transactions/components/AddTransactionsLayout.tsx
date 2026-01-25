import { FormProvider, useForm } from 'react-hook-form';
import AddRecordingSection from '@/features/add-recording/components/AddRecordingSection';
import { Navigate, Outlet, useParams } from 'react-router-dom';

function AddTransactionLayout() {
  const methods = useForm({
    defaultValues: {
      name: '',

      amount: '',
      category: null,
      date: new Date(),
      description: '',
    },
  });

  const { type } = useParams();

  const isValidTransactionType = (
    type?: string
  ): type is 'income' | 'expense' => type === 'income' || type === 'expense';

  if (!isValidTransactionType(type)) {
    return <Navigate to="expense" replace />;
  }

  return (
    <FormProvider {...methods}>
      <AddRecordingSection />
      <Outlet /> {/* Renders TransactionsFormContent */}
    </FormProvider>
  );
}

export default AddTransactionLayout;
