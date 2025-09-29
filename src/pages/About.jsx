import React from "react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">About Quick Loan</h1>

      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Welcome to <span className="font-semibold text-blue-600">Quick Loan</span>, 
        your trusted platform for fast, secure, and hassle-free loans. 
        We are committed to making borrowing simple, transparent, and accessible 
        to everyone who needs financial support.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission Section */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            To empower individuals by providing easy access to loans with 
            flexible terms and transparent processes, ensuring financial 
            independence and peace of mind.
          </p>
        </div>

        {/* Vision Section */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            To become the most reliable digital loan platform in India by 
            offering innovative financial solutions that cater to every 
            individual’s unique needs.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Why Choose Quick Loan?</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>⚡ Fast approval process with minimal documentation</li>
          <li>✅ Transparent terms and no hidden charges</li>
          <li>📱 Easy online application and tracking</li>
          <li>🏦 Flexible repayment options tailored to your needs</li>
          <li>🔒 Secure and reliable platform</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
