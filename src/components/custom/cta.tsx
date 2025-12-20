"use client";

export default function CTA() {
  return (
    <section className="w-full flex items-center justify-center my-16">
      <div className="w-full h-full bg-teal-500 text-white px-16 py-12 rounded-lg shadow-lg transition-colors duration-300 space-y-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Interested in working together?
        </h2>
        <p className="text-md mb-8">
          Feel free to reach out for collaborations or just a friendly chat!
        </p>
        <a
          href="mailto:abhimanyug987@gmail.com"
          className="bg-white text-teal-500 px-6 py-3 rounded-none font-semibold hover:bg-zinc-200 transition-colors duration-300"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}
