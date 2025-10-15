'use client';

import { useState } from 'react';
import CheckoutSteps from './CheckoutSteps';
import AddressStep from './AddressStep';
import ShippingStep from './ShippingStep';
import PaymentStep from './PaymentStep';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="w-[1440px] mx-auto bg-white min-h-screen py-10">
      {step === 1 && (
        <div className="flex flex-col items-center gap-12">
          <div className="mb-8">
            <CheckoutSteps step={1} />
          </div>

          <AddressStep onNext={nextStep} />
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center gap-12">
          <div className="mb-8">
            <CheckoutSteps step={2} />
          </div>

          <ShippingStep onNext={nextStep} onBack={prevStep} />
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-12">
          <div className="mb-8">
            <CheckoutSteps step={3} />
          </div>

          <PaymentStep onBack={prevStep} />
        </div>
      )}
    </div>
  );
}
