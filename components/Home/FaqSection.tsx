'use client';
import { useState } from 'react';
import Link from 'next/link';

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: 'What is Mamla Karo?',
    answer: 'Mamla Karo is an innovative LegalTech platform designed to provide affordable, accessible, and quality legal services. We aim to connect users with expert legal professionals for consultations, document creation, and other legal needs, streamlining the legal process through technology.',
  },
  {
    question: 'Is Mamla Karo operational?',
    answer: 'Mamla Karo is not operational yet but we are working hard to launch soon. Our goal is to be fully operational by 1st February 2025. In the meantime, users can register their interest by creating an account with us. Visit our sign-up page to get early access and updates.',
  },
  {
    question: 'What is the beta phase of Mamla Karo?',
    answer: 'The beta phase of Mamla Karo is a testing period where selected users can access a preview version of our platform. During this phase, we gather feedback to improve the user experience, fine-tune our features, and ensure the platform runs smoothly before the official public launch.',
  },
  {
    question: 'When will the beta be launched?',
    answer: 'Mamla Karo’s beta phase is expected to begin in Q4 2024. This will give early users access to our platform’s key features, including lawyer consultations and basic document generation. Beta testers will help us refine the platform ahead of the full launch.',
  },
  {
    question: 'How do I access Mamla Karo services?',
    answer: 'Once Mamla Karo becomes operational, you can access our services by signing up on our website. After registration, you’ll be able to select from a variety of legal services, including consultations with expert lawyers and document creation services.',
  },
  {
    question: 'What services does Mamla Karo offer?',
    answer: 'Mamla Karo offers a range of legal services, including lawyer consultations, legal document creation, contract drafting, dispute resolution, and more. We focus on making legal services accessible to everyone, ensuring that you get the support you need when it matters most.',
  },
  {
    question: 'Can I consult with a lawyer on Mamla Karo?',
    answer: 'Yes, Mamla Karo will allow users to schedule consultations with experienced lawyers. You can connect with a lawyer through video calls or in-person meetings, depending on the availability of the lawyer and your preferences.',
  },
  {
    question: 'How secure is my data on Mamla Karo?',
    answer: 'Your privacy and data security are our top priorities. Mamla Karo uses advanced encryption methods to safeguard your personal information. We comply with all data protection laws to ensure your information remains secure and confidential.',
  },
  {
    question: 'What if I need more help with legal matters?',
    answer: 'If you need further assistance, Mamla Karo will offer customer support through our platform. Additionally, you can schedule an in-depth consultation with a lawyer to address your legal concerns. We are committed to helping you through every step of your legal journey.',
  },
  {
    question: 'How much do Mamla Karo services cost?',
    answer: 'Mamla Karo will offer both free and paid services. Basic consultations and general legal information will be available for free. More specialized services, such as legal consultations and document creation, will come at affordable rates. Our goal is to make legal services accessible and affordable for everyone.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleViewMore = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="faq-section bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqData.slice(0, showAll ? faqData.length : 5).map((faq, index) => (
            <div key={index} className="faq-item border-b pb-4">
              <button
                className="faq-question text-left w-full font-medium text-blue-600"
                onClick={() => toggleFaq(index)}
              >
                <div className="flex items-center justify-between">
                  <span>{faq.question}</span>
                  <span>{openIndex === index ? '↑' : '↓'}</span>
                </div>
              </button>
              {openIndex === index && (
                <div className="faq-answer mt-2 text-gray-700">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
          <div className="text-center mt-6">
            <button onClick={toggleViewMore} className="text-blue-500 hover:underline">
              {showAll ? 'View Less' : 'View More'}
            </button>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-700">
              Have more questions?{' '}
              <Link href="mailto:care@mamlakaro.com" className="text-blue-500 hover:underline">
                Contact us here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
