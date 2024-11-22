import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { useWorkflowStore } from '../store/workflowStore';
import { AuthModal } from './AuthModal';
import { PaymentModal } from './PaymentModal';
import { useAuthFlow } from '../hooks/useAuthFlow';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { subscription } = useSubscriptionStore();
  const { currentStep } = useWorkflowStore();
  const {
    showAuthModal,
    showPaymentModal,
    handleAuthSuccess,
    handlePaymentSuccess,
    setShowAuthModal,
    setShowPaymentModal
  } = useAuthFlow();

  useEffect(() => {
    // Save current location if user needs to authenticate
    if (!user && currentStep > 2) {
      navigate('/', { state: { from: location.pathname } });
    }
  }, [user, currentStep, navigate]);

  return (
    <>
      {children}
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
      
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
}