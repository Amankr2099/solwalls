'use client';

const PrivacyPolicy = () => {
  return (
    <section className="min-h-screen bg-gray-900 text-white px-6 py-20 flex items-center justify-center">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4 text-gray-300">
          At SolWalls, your privacy matters to us. This policy outlines how we collect, use, and protect your information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
        <p className="text-gray-400 mb-4">
          We may collect basic, non-personal information such as your browser type, device, and usage behavior when you visit our site. This helps us improve performance and user experience.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">2. Cookies</h2>
        <p className="text-gray-400 mb-4">
          We use cookies to provide a smoother browsing experience. You can disable cookies in your browser settings if you prefer.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">3. Third-Party Services</h2>
        <p className="text-gray-400 mb-4">
          We may use analytics tools (like Google Analytics) to understand traffic patterns. These tools do not collect personal data that identifies you individually.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">4. Data Security</h2>
        <p className="text-gray-400 mb-4">
          We prioritize security and do not share your data with third parties, except as needed to operate the site effectively.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">5. Changes to This Policy</h2>
        <p className="text-gray-400 mb-4">
          This policy may be updated periodically. Any changes will be posted on this page with a revised effective date.
        </p>

        <p className="text-gray-500 mt-8">
          If you have any questions about this policy, please contact us at support@solwalls.com.
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
