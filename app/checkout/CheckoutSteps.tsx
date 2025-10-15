import { Home, Truck, CreditCard } from 'lucide-react';

interface CheckoutStepsProps {
  step: number;
}

export default function CheckoutSteps({ step }: CheckoutStepsProps) {
  const checkoutSteps = [
    { number: 1, label: 'Address', icon: Home, position: 'justify-start' },
    { number: 2, label: 'Shipping', icon: Truck, position: 'justify-center' },
    { number: 3, label: 'Payment', icon: CreditCard, position: 'justify-end' },
  ];

  const getProgressWidth = () => {
    if (step === 1) return '1';
    if (step === 2) return '2';
    if (step === 3) return '3';
    return '1';
  };

  return (
    <div className="w-[1090px] mx-auto flex items-center relative px-6">
      {checkoutSteps.map((currentStep) => {
        const StepIcon = currentStep.icon;
        return (
          <div
            key={currentStep.number}
            className={`flex ${currentStep.position} w-1/3 items-center`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center rounded-full border w-8 h-8 transition-all ${
                  step >= currentStep.number
                    ? 'bg-black text-white border-black'
                    : 'bg-gray-200 text-gray-500 border-gray-300'
                }`}
              >
                <StepIcon className="w-4 h-4" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-semibold">
                  Step {currentStep.number}
                </span>
                <span
                  className={`text-sm ${
                    step === currentStep.number
                      ? 'font-bold text-black'
                      : 'text-gray-500'
                  }`}
                >
                  {currentStep.label}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute top-1/2 left-6 right-6 h-[2px] bg-gray-300 -z-10" />

      <div
        className="absolute top-1/2 left-6 h-[2px] bg-black -z-10 transition-all duration-500"
        style={{
          width: getProgressWidth(),
        }}
      />
    </div>
  );
}