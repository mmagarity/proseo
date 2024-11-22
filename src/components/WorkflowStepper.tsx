import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  completed: boolean;
}

interface WorkflowStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
}

export function WorkflowStepper({ steps, currentStep, onStepClick }: WorkflowStepperProps) {
  const canNavigateToStep = (stepIndex: number) => {
    return stepIndex <= currentStep;
  };

  const getStepStyle = (index: number, completed: boolean) => {
    if (completed) return 'bg-green-100';
    if (index === currentStep) return 'bg-blue-100';
    return 'bg-gray-100';
  };

  const getIconStyle = (index: number, completed: boolean) => {
    if (completed) return 'text-green-600';
    if (index === currentStep) return 'text-blue-600';
    return 'text-gray-400';
  };

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <div className="flex flex-col items-center">
              <button
                onClick={() => canNavigateToStep(index) && onStepClick(index)}
                disabled={!canNavigateToStep(index)}
                className={`flex flex-col items-center ${canNavigateToStep(index) ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors
                  ${getStepStyle(index, step.completed)}
                  ${canNavigateToStep(index) ? 'hover:ring-2 hover:ring-offset-2 hover:ring-blue-500' : ''}`}
                >
                  {step.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <Circle className={`w-6 h-6 ${getIconStyle(index, step.completed)}`} />
                  )}
                </div>
                <div className="mt-2">
                  <p className={`text-sm font-medium ${canNavigateToStep(index) ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </button>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-px bg-gray-200 mx-4" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}