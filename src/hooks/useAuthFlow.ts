import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { useWorkflowStore } from '../store/workflowStore';

export function useAuthFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const { status } = useSubscriptionStore();
  const { currentStep, saveWorkflowState } = useWorkflowStore();

  useEffect(() => {
    // Require auth and payment for steps 4 (CMS) and 5 (Publish)
    if (currentStep >= 4 && !user) {
      // Save current workflow state
      saveWorkflowState();
      // Redirect to login with return path
      navigate('/login', { 
        state: { 
          from: location.pathname,
          step: currentStep
        }
      });
      return;
    }

    if (currentStep >= 4 && user && !status?.isActive) {
      // User is logged in but hasn't paid
      navigate('/pricing', {
        state: {
          from: location.pathname,
          step: currentStep
        }
      });
      return;
    }
  }, [currentStep, user, status, navigate, location]);

  return {
    requiresAuth: currentStep >= 4,
    requiresPayment: currentStep >= 4 && user && !status?.isActive
  };
}