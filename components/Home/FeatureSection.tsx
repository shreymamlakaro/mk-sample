'use client';
import React from 'react';
import { FaCheckCircle, FaUsers, FaGlobe, FaShieldAlt } from 'react-icons/fa';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center bg-white shadow-md p-6 rounded-lg">
    <div className="text-blue-500 text-4xl mb-4">{icon}</div>
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-16 px-4 sm:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold">
          Why Choose <span className="text-blue-700">Mamla Karo?</span>
        </h2>
        <p className="mt-4 text-gray-600">Discover the benefits of joining our platform.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <FeatureCard
            icon={<FaUsers />}
            title="Expert Legal Assistance"
            description="Access experienced lawyers and get professional advice tailored to your needs."
          />
          <FeatureCard
            icon={<FaGlobe />}
            title="Easy Accessibility"
            description="Connect with legal experts anytime, anywhere through our secure platform."
          />
          <FeatureCard
            icon={<FaCheckCircle />}
            title="Hassle-Free Services"
            description="Enjoy seamless legal services with real-time consultations and documentation."
          />
          <FeatureCard
            icon={<FaShieldAlt />}
            title="Secure & Private"
            description="Your data and interactions are safe with our advanced security measures."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
