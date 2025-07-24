'use client';

const stats = [
  { label: 'Attendees Expected', value: '2,500+' },
  { label: 'Expert Speakers', value: '50+' },
  { label: 'Interactive Sessions', value: '25+' },
  { label: 'Networking Hours', value: '12+' },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Event By The Numbers
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join thousands of professionals in the most comprehensive tech event of the year.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-blue-100 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}