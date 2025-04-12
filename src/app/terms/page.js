'use client';

const TermsAndConditions = () => {
  return (
    <section className="min-h-screen bg-gray-900 text-white px-6 py-20 flex items-center justify-center">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>

        <p className="text-gray-300 mb-4">
          By accessing and using SolWalls, you agree to the following terms and conditions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">1. Personal Use Only</h2>
        <p className="text-gray-400 mb-4">
          All wallpapers provided on SolWalls are for personal, non-commercial use only. You may download, use, and enjoy them on your devices, but you may not resell, redistribute, or use them for any commercial project without explicit permission.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">2. Intellectual Property</h2>
        <p className="text-gray-400 mb-4">
          All images and content are either owned by SolWalls or licensed for use. Unauthorized reproduction or misuse is strictly prohibited.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">3. No Warranty</h2>
        <p className="text-gray-400 mb-4">
          SolWalls provides wallpapers "as is". We make no guarantees regarding availability, quality, or fitness for a specific purpose.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">4. Modifications</h2>
        <p className="text-gray-400 mb-4">
          We may update these terms at any time without prior notice. Continued use of the site implies acceptance of the new terms.
        </p>

        <p className="text-gray-500 mt-8">
          Questions? Reach out to us at support@solwalls.com.
        </p>
      </div>
    </section>
  );
};

export default TermsAndConditions;
