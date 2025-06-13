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
    <div className="w-[450px] bg-transparent bg-opacity-60 backdrop-blur-md rounded-[15px] p-6 text-white">
      <p className="text-sm font-semibold mb-2 text-gray-300">{brief}</p>
      <p className="text-base mb-4 leading-relaxed text-gray-300">{desc}</p>
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