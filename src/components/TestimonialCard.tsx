import React from 'react';

interface TestimonialCardProps {
  brief: string;
  desc: string;
  name: string;
  avatar: string;
  avatarBgColor: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ brief, desc, name, avatar, avatarBgColor }) => {
  return (
    <div className="w-[350px] bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-xl p-6 shadow-lg text-white">
      <p className="text-sm font-semibold mb-2">{brief}</p>
      <p className="text-base mb-4 leading-relaxed text-gray-100">{desc}</p>
      <div className="flex items-center mt-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mr-3 ${avatarBgColor}`}>
          {avatar}
        </div>
        <p className="font-semibold text-sm opacity-90 text-gray-100">{name}</p>
      </div>
    </div>
  );
};

export default TestimonialCard; 