import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TransactionsFormContent() {
  const { type = 'expense' } = useParams();
  const navigate = useNavigate();

  console.log('type:', type);

  useEffect(() => {
    if (!type) navigate('expense', { replace: true });
  }, [type, navigate]);

  return <h2>TransactionsFormContent</h2>;
}
export default TransactionsFormContent;
