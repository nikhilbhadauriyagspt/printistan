import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    question: "What types of imaging solutions do you provide?",
    answer: "We offer a diverse range of equipment including inkjet, laserjet, and all-in-one systems suitable for both home offices and large-scale business environments."
  },
  {
    question: "Do you offer nationwide delivery?",
    answer: "Yes, we ship our products across the entire United States, ensuring that your office essentials reach you quickly and safely regardless of your location."
  },
  {
    question: "How can I find the right accessories for my device?",
    answer: "Our catalog includes a wide variety of genuine supplies. You can easily browse by category or use our search feature to find compatible ink, toner, and other necessities."
  }
];

export default function HomeSEOContent() {
  return (
    <section className="w-full py-16 bg-gray-50 font-poppins">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
            Your Trusted Partner for <span className="text-blue-600">Advanced Documentation Solutions</span>
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            At Printistan, we are dedicated to simplifying your professional workflow. Our collection of high-efficiency devices and dependable supplies is curated to meet the demands of modern workspaces. Whether you are looking for crisp black-and-white reports or vibrant, full-color marketing materials, we have the right tools to help you succeed.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Expert Guidance & Support</h3>
              <p className="text-gray-500">
                Choosing the right equipment can be challenging. Our knowledgeable team is here to provide insights and recommendations tailored to your specific volume and quality requirements, ensuring you make an informed decision.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Reliable Nationwide Service</h3>
              <p className="text-gray-500">
                We take pride in our efficient logistics network. From the moment you place an order to the final delivery at your doorstep, we prioritize speed and care to keep your operations running smoothly.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-[#1A1A1A] mb-8">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqData.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h4 className="text-lg font-semibold text-[#1A1A1A] mb-2">{item.question}</h4>
                  <p className="text-gray-500">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
