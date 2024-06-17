import React from 'react';

export default function StepperIndicators ({currentStep}: any) {
    const activeColor = (index: number): string => currentStep >= index ? 'bg-blue-500' : 'bg-gray-300'
    const isFinalStep = (index: number): boolean => index === 3 - 1

    return (
        <div className="flex items-center">
            {Array.from({length: 3}).map((_, index) => (
                <React.Fragment key={index}>
                    <div className={`w-6 h-6 rounded-full ${activeColor(index)}`}></div>
                    {isFinalStep(index) ? null : <div className={`w-12 h-1 ${activeColor(index)}`}></div>}
                </React.Fragment>
            ))}
        </div>
    )
}
