import React, { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

interface ProductTourProps {
  isRunning: boolean;
  onFinish: () => void;
}

export const ProductTour: React.FC<ProductTourProps> = ({ isRunning, onFinish }) => {
  const [stepIndex, setStepIndex] = useState(0);

  const steps: Step[] = [
    {
      target: '[data-tour="chat-tab"]',
      content: 'Start with our KYC Assistant - a conversational AI that helps you analyze customer behavior and communication patterns.',
      placement: 'right',
    },
    {
      target: '[data-tour="customer-chat-input"]',
      content: 'Ask questions about customer behavior, communication patterns, or specific customers. Try "What\'s the risk for CUSTOMER_001?"',
      placement: 'top',
    },
    {
      target: '[data-tour="customer-input"]',
      content: 'Start by entering a customer ID here. Try CUSTOMER_001 or CUSTOMER_002 to see different behavioral risk profiles.',
      placement: 'bottom',
    },
    {
      target: '[data-tour="analyze-button"]',
      content: 'Click this button to trigger our AI agents and get a comprehensive customer behavior assessment.',
      placement: 'bottom',
    },
    {
      target: '[data-tour="workflow-tab"]',
      content: 'Switch to this tab to see how our AI agents work together to analyze customer behavior patterns.',
      placement: 'right',
    },
    {
      target: '[data-tour="inter-agent"]',
      content: 'View real-time communication between agents as they coordinate and share insights during analysis.',
      placement: 'right',
    },
    {
      target: '[data-tour="journey"]', 
      content: 'Track customer interaction history and behavioral patterns over time for deeper insights.',
      placement: 'right',
    },
    {
      target: '[data-tour="admin-tab"]',
      content: 'The Admin panel lets you review, edit, and audit AI decisions with human oversight.',
      placement: 'right',
    },
    {
      target: '[data-tour="analytics-tab"]',
      content: 'View comprehensive analytics and insights about your risk assessment patterns and performance.',
      placement: 'right',
    },
    {
      target: '[data-tour="responsible-ai-tab"]',
      content: 'Learn about our responsible AI practices, bias detection, and compliance features.',
      placement: 'right',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      onFinish();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={isRunning}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#000000',
          backgroundColor: '#ffffff',
          textColor: '#333333',
          arrowColor: '#ffffff',
        },
        tooltip: {
          borderRadius: '12px',
          fontSize: '14px',
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        buttonNext: {
          backgroundColor: '#000000',
          color: '#ffffff',
          borderRadius: '8px',
          padding: '8px 16px',
          border: 'none',
          fontSize: '14px',
          fontWeight: '500',
        },
        buttonBack: {
          color: '#666666',
          marginRight: '8px',
        },
        buttonSkip: {
          color: '#666666',
        },
      }}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Finish',
        next: 'Next',
        skip: 'Skip Tour',
      }}
    />
  );
};