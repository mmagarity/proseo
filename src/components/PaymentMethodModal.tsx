import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useSubscriptionStore } from '../store/subscriptionStore';

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentMethodModal({ isOpen, onClose }: PaymentMethodModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const { updatePaymentMethod } = useSubscriptionStore();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    try {
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        elements,
        params: {
          type: 'card',
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'An error occurred');
        return;
      }

      await updatePaymentMethod(paymentMethod.id);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to update payment method');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg w-full max-w-md p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-medium mb-4">Update Payment Method</h2>
          
          <form onSubmit={handleSubmit}>
            <PaymentElement className="mb-6" />
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing || !stripe}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Processing...
                </div>
              ) : (
                'Update Payment Method'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}