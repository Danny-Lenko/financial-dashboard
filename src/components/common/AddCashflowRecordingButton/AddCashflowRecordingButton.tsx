interface Props {
  type: 'income' | 'expense' | 'transfer';
}

function AddCashflowRecordingButton({ type }: Props) {
  return (
    <>
      <div>{type}</div>
      <div>AddCashflowRecordingButton</div>
      <div>AddCashflowRecordingButton</div>
    </>
  );
}

export default AddCashflowRecordingButton;
