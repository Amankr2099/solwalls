'use client';

const Join = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-6 py-20 flex items-center justify-center">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Join the SolWalls Creator Community</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Got an eye for aesthetics? Love creating stunning wallpapers? Soon, you’ll be able to share your art with the world right here on SolWalls.
        </p>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          We’re working on a platform that will let artists and creators contribute their work and connect with a global audience who vibes with their style. Whether you’re into abstract, minimal, dreamy, or bold — we want your vision.
        </p>

        <div className="bg-yellow-900 text-yellow-300 px-6 py-4 rounded-lg inline-block">
          🚧 Creator submissions are coming soon. Stay tuned!
        </div>

        <p className="mt-8 text-gray-500">
          Want early access or updates? Shoot us a message at <span className="underline">creators@solwalls.com</span>
        </p>
      </div>
    </section>
  );
};

export default Join;
