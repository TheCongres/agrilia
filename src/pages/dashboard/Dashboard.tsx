
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to appropriate dashboard based on user type
    if (user) {
      if (user.user_type === 'producer') {
        navigate('/dashboard/producer', { replace: true });
      } else {
        navigate('/dashboard/consumer', { replace: true });
      }
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-natural-600"></div>
    </div>
  );
};

export default Dashboard;
