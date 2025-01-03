/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface SocialLinks {
  linkedin: string;
  twitter: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
  socialLinks: SocialLinks;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Debargha Datta',
    role: 'Founder & CEO',
    image: '/assets/debargha.jpg', // Replace with actual image paths
    description: 'Passionate about building innovative solutions and leading the team to success.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/debarghadatta', // Replace with actual links
      twitter: 'https://twitter.com/debarghadatta',
    },
  },
  {
    name: 'Suresh Gupta',
    role: 'CTO',
    image: '/assets/suresh.jpg', // Replace with actual image paths
    description: 'Tech visionary focused on transforming ideas into cutting-edge solutions.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/sureshgupta', // Replace with actual links
      twitter: 'https://twitter.com/sureshgupta',
    },
  },
  {
    name: 'John Doe',
    role: 'Product Manager',
    image: '/assets/john.jpg', // Replace with actual image paths
    description: 'Dedicated to creating great products and ensuring seamless user experiences.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/johndoe', // Replace with actual links
      twitter: 'https://twitter.com/johndoe',
    },
  },
];

const AboutUs: React.FC = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 ">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">About Us</h2>

        <p className="text-lg text-gray-700 text-center mb-16">
          We are a passionate team of professionals committed to delivering high-quality solutions. Our diverse expertise allows us to work together seamlessly and drive innovation.
        </p>

        {/* Team Member Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-blue-700">{member.name}</h3>
                <p className="text-lg text-gray-600 mb-4">{member.role}</p>
                <p className="text-gray-700">{member.description}</p>
                <div className="flex mt-6 space-x-4">
                  <a
                    href={member.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <i className="fab fa-linkedin-in text-2xl"></i>
                  </a>
                  <a
                    href={member.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600"
                  >
                    <i className="fab fa-twitter text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
