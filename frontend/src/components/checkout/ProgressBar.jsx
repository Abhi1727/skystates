import React from 'react';

const ProgressBar = ({ currentStep, onStepClick }) => {
  const steps = [
    { number: 1, title: 'Contact', description: 'Your information' },
    { number: 2, title: 'Payment', description: 'Payment method' },
    { number: 3, title: 'Review', description: 'Confirm order' }
  ];

  return (
    <div className="progress-bar">
      <div className="progress-track">
        {steps.map((step, index) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          const isUpcoming = step.number > currentStep;
          
          return (
            <div
              key={step.number}
              className={`progress-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isUpcoming ? 'upcoming' : ''}`}
              onClick={() => onStepClick && onStepClick(step.number)}
            >
              <div className="step-indicator">
                {isCompleted ? (
                  <svg className="checkmark" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span className="step-number">{step.number}</span>
                )}
              </div>
              
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`progress-line ${isCompleted ? 'completed' : ''}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
