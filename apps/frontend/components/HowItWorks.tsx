import React from 'react';

export const HowItWorks: React.FC = () => {
  const steps = [
    { title: 'Discover', description: 'Find startups that match your interests.', icon: '🔍' },
    { title: 'Connect', description: 'Reach out to founders directly.', icon: '🤝' },
    { title: 'Grow', description: 'Join the community and scale together.', icon: '🚀' },
  ];

  return (
    <section className="my-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div key={step.title} className="flex flex-col items-center text-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
            <div className="text-5xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
