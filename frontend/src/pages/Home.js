import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [showHtmlNotes, setShowHtmlNotes] = useState(false);
  const [showCssNotes, setShowCssNotes] = useState(false);
  const [showJavaNotes, setShowJavaNotes] = useState(false);
  const [showJsNotes, setShowJsNotes] = useState(false);
  const [showPythonNotes, setShowPythonNotes] = useState(false);
  const [showCNotes, setShowCNotes] = useState(false);
  const [showCppNotes, setShowCppNotes] = useState(false);
  const [showAptitudeNotes, setShowAptitudeNotes] = useState(false);
  const [showWebDev, setShowWebDev] = useState(false);
  const [showAppDev, setShowAppDev] = useState(false);
  const [showDataScience, setShowDataScience] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showML, setShowML] = useState(false);

  const categories = [
    { name: 'HTML', color: 'from-orange-400 to-red-500', icon: '🌐' },
    { name: 'CSS', color: 'from-blue-400 to-blue-600', icon: '🎨' },
    { name: 'JavaScript', color: 'from-yellow-400 to-yellow-600', icon: '⚡' },
    { name: 'Python', color: 'from-green-400 to-green-600', icon: '🐍' },
    { name: 'Java', color: 'from-red-400 to-red-600', icon: '☕' },
    { name: 'C', color: 'from-gray-400 to-gray-600', icon: '⚙️' },
    { name: 'C++', color: 'from-purple-400 to-purple-600', icon: '🔧' },
    { name: 'Aptitude', color: 'from-indigo-400 to-purple-600', icon: '🧠' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="text-white py-20 relative overflow-hidden min-h-screen flex items-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up animate-text-glow">
            Shiksha Dakshaka
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up animate-delay-200">
            Master programming with interactive quizzes and code challenges
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-500">
            <Link
              to="/quiz/HTML"
              className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover-lift btn-primary shadow-lg"
            >
              Start Learning 🚀
            </Link>
            <Link
              to="/compiler"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300 glass"
            >
              Try Compiler 💻
            </Link>
          </div>
        </div>
      </div>

      {/* Career Aptitude Paths Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 animate-fade-in-up">Career Aptitude Paths</h2>

          {/* Web Development */}
          <div className="mb-6">
            <div className="text-center mb-4">
              <button
                onClick={() => setShowWebDev(!showWebDev)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {showWebDev ? 'Hide 🌐 Web Development' : 'Explore 🌐 Web Development'}
              </button>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showWebDev ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg border-l-4 border-blue-500">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">🌐 Web Development</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  <strong>Definition:</strong> Web Development is the process of building and maintaining websites or web applications using technologies like HTML, CSS, JavaScript, and frameworks such as React, Angular, and Node.js.
                </p>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Aptitude Skills Needed:</h4>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>Logical reasoning and problem-solving</li>
                  <li>Creativity and design sense</li>
                  <li>Understanding of web architecture</li>
                  <li>Debugging and testing skills</li>
                </ul>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Career Scope:</h4>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>Frontend Developer</li>
                  <li>Backend Developer</li>
                  <li>Full Stack Developer</li>
                  <li>Web Designer</li>
                </ul>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">Learn More</button>
              </div>
            </div>
          </div>

          {/* App Development */}
          <div className="mb-6">
            <div className="text-center mb-4">
              <button
                onClick={() => setShowAppDev(!showAppDev)}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {showAppDev ? 'Hide 📱 App Development' : 'Explore 📱 App Development'}
              </button>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showAppDev ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 shadow-lg border-l-4 border-green-500">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">📱 App Development</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  <strong>Definition:</strong> App Development involves creating mobile or desktop applications for Android, iOS, or cross-platform systems using tools like Kotlin, Swift, Flutter, and React Native.
                </p>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Aptitude Skills Needed:</h4>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>Logical and analytical thinking</li>
                  <li>Understanding of UI/UX</li>
                  <li>Coding and debugging</li>
                  <li>Data handling and API integration</li>
                </ul>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Career Scope:</h4>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>Android/iOS Developer</li>
                  <li>Cross-Platform Developer</li>
                  <li>Mobile App Tester</li>
                </ul>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">Learn More</button>
              </div>
            </div>
          </div>

          {/* Data Science */}
          <div className="mb-6">
            <div className="text-center mb-4">
              <button
                onClick={() => setShowDataScience(!showDataScience)}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {showDataScience ? 'Hide 📊 Data Science' : 'Explore 📊 Data Science'}
              </button>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showDataScience ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 shadow-lg border-l-4 border-purple-500">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">📊 Data Science</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  <strong>Definition:</strong> Data Science is the field that combines statistics, programming, and domain expertise to extract meaningful insights from data.
                </p>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Aptitude Skills Needed:</h4>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>Analytical thinking and mathematical ability</li>
                  <li>Logical reasoning and data interpretation</li>
                  <li>Problem-solving using Python/R</li>
                  <li>Knowledge of statistics and visualization</li>
                </ul>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Career Scope:</h4>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>Data Analyst</li>
                  <li>Data Scientist</li>
                  <li>Business Intelligence Engineer</li>
                </ul>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">Learn More</button>
              </div>
            </div>
          </div>

          {/* AI */}
          <div className="mb-6">
            <div className="text-center mb-4">
              <button
                onClick={() => setShowAI(!showAI)}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {showAI ? 'Hide 🤖 Artificial Intelligence' : 'Explore 🤖 Artificial Intelligence'}
              </button>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showAI ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8 shadow-lg border-l-4 border-red-500">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">🤖 Artificial Intelligence (AI)</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  <strong>Definition:</strong> Artificial Intelligence focuses on building intelligent machines that can mimic human behavior — learning, reasoning, and problem-solving.
                </p>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Aptitude Skills Needed:</h4>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>Mathematical and logical reasoning</li>
                  <li>Algorithmic thinking</li>
                  <li>Pattern recognition</li>
                  <li>Creativity and innovation</li>
                </ul>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Career Scope:</h4>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>AI Engineer</li>
                  <li>NLP Engineer</li>
                  <li>Robotics Developer</li>
                </ul>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">Learn More</button>
              </div>
            </div>
          </div>

          {/* ML */}
          <div className="mb-6">
            <div className="text-center mb-4">
              <button
                onClick={() => setShowML(!showML)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {showML ? 'Hide 🧩 Machine Learning' : 'Explore 🧩 Machine Learning'}
              </button>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showML ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 shadow-lg border-l-4 border-orange-500">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">🧩 Machine Learning (ML)</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  <strong>Definition:</strong> Machine Learning is a branch of AI that allows systems to learn automatically from data without explicit programming.
                </p>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Aptitude Skills Needed:</h4>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>Strong mathematical background (Linear Algebra, Statistics)</li>
                  <li>Analytical and logical reasoning</li>
                  <li>Programming (Python, R)</li>
                  <li>Problem-solving using algorithms</li>
                </ul>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Career Scope:</h4>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>Machine Learning Engineer</li>
                  <li>Data Scientist</li>
                  <li>Research Engineer</li>
                </ul>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">Learn More</button>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">💡 Conclusion</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Each path requires a unique aptitude blend — analytical thinking, problem-solving, creativity, and technical understanding.<br />
                This section helps users identify which domain best suits their skills and interests, guiding them toward their ideal tech career path.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 animate-fade-in-up">Why Choose Shiksha Dakshaka?</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="flex items-center p-6 bg-white rounded-xl shadow-md hover-lift card-hover animate-slide-in-left">
              <div className="text-4xl mr-4 animate-bounce-in">📚</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Quizzes</h3>
                <p className="text-gray-600">Test your knowledge across multiple programming languages</p>
              </div>
            </div>
            <div className="flex items-center p-6 bg-white rounded-xl shadow-md hover-lift card-hover animate-fade-in-up animate-delay-200">
              <div className="text-4xl mr-4 animate-bounce-in animate-delay-200">💻</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Online Compiler</h3>
                <p className="text-gray-600">Practice coding with our built-in compiler for multiple languages</p>
              </div>
            </div>
            <div className="flex items-center p-6 bg-white rounded-xl shadow-md hover-lift card-hover animate-slide-in-right">
              <div className="text-4xl mr-4 animate-bounce-in animate-delay-300">🏆</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-gray-600">Monitor your learning journey with detailed statistics</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Categories */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 animate-fade-in-up">Choose Your Quiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/quiz/${category.name}`}
                className={`bg-gradient-to-r ${category.color} text-white p-6 rounded-xl shadow-lg card-hover group animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4 group-hover:animate-bounce transition-transform duration-300">{category.icon}</div>
                <h3 className="text-xl font-bold mb-2">{category.name} Quiz</h3>
                <p className="opacity-90">Test your {category.name} skills</p>
                <div className="mt-4 text-sm opacity-75 flex items-center">
                  <span>15 Questions • 30s each</span>
                  <span className="ml-auto opacity-50 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>


      {/* HTML Notes Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 animate-fade-in-up">HTML Notes</h2>
          <div className="text-center mb-8">
            <button
              onClick={() => setShowHtmlNotes(!showHtmlNotes)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {showHtmlNotes ? 'Hide Notes 📖' : 'View HTML Notes 📖'}
            </button>
          </div>
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showHtmlNotes ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg border-l-4 border-purple-500">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                HTML stands for <strong>HyperText Markup Language</strong>.<br />
                It is the standard language used to create and design the structure of web pages on the Internet.<br />
                Every website you visit is built using HTML as its foundation.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">📖 Definition:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>HTML is a markup language, not a programming language.</li>
                <li>It uses a system of tags and attributes to define how the content on a web page should be displayed in a browser.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧩 Features of HTML:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Platform Independent:</strong> HTML pages can run on any browser or operating system.</li>
                <li><strong>Simple and Easy:</strong> It is easy to learn and use.</li>
                <li><strong>Structured Documents:</strong> Helps in organizing text, images, links, and multimedia.</li>
                <li><strong>Hyperlink Support:</strong> Allows linking one page to another using hyperlinks.</li>
                <li><strong>Multimedia Support:</strong> Images, audio, and videos can be added to make web pages interactive.</li>
                <li><strong>Forms and Input:</strong> Supports forms to collect data from users.</li>
                <li><strong>Integration:</strong> HTML can be combined with CSS for styling and JavaScript for interactivity.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧱 Basic Structure of HTML Document:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Head Section:</strong> Contains page title and metadata.</li>
                <li><strong>Body Section:</strong> Contains visible content like text, images, links.</li>
                <li><strong>Tags:</strong> Enclosed within < > and </ > to define elements.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">📘 Uses of HTML:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>To create the structure of web pages.</li>
                <li>To link web pages together using hyperlinks.</li>
                <li>To display text, images, audio, and videos.</li>
                <li>To create forms for user interaction.</li>
                <li>To build the foundation for web applications.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧠 Advantages of HTML:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Easy to learn and use.</li>
                <li>Supported by all browsers.</li>
                <li>Integrates easily with CSS and JavaScript.</li>
                <li>Requires no special software.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">⚙️ Limitations of HTML:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Cannot create dynamic or interactive pages alone.</li>
                <li>Depends on CSS for styling and JavaScript for functionality.</li>
                <li>Limited control over page layout compared to modern frameworks.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Notes Section */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 animate-fade-in-up">CSS Notes</h2>
          <div className="text-center mb-8">
            <button
              onClick={() => setShowCssNotes(!showCssNotes)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {showCssNotes ? 'Hide Notes 🎨' : 'View CSS Notes 🎨'}
            </button>
          </div>
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showCssNotes ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg border-l-4 border-green-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">What is CSS?</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                CSS stands for <strong>Cascading Style Sheets</strong>.<br />
                It is a stylesheet language used to control the presentation and layout of web pages written in HTML or XML.<br />
                While HTML structures the content of a web page, CSS is responsible for how that content looks — including colors, fonts, spacing, alignment, and responsiveness.<br />
                CSS allows web designers and developers to separate content from design, making websites easier to maintain and more visually appealing.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">📖 Definition:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>CSS is a style sheet language that describes the look and formatting of a document written in HTML.</li>
                <li>It enables developers to apply styles consistently across multiple web pages, reducing repetition and making design changes easier to manage.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧩 Features of CSS:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Separation of Content and Style</li>
                <li>Multiple Styles for One Page</li>
                <li>Control Layouts</li>
                <li>Design Consistency</li>
                <li>Supports Responsive Design</li>
                <li>Typography Control</li>
                <li>Visual Effects</li>
                <li>Browser Compatibility</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧱 Components of CSS:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Selector:</strong> The element or group of elements you want to style (e.g., p, h1, .className, #id).</li>
                <li><strong>Property:</strong> The aspect of the element you want to style (e.g., color, font-size, margin).</li>
                <li><strong>Value:</strong> The specific setting for the property (e.g., red, 16px, 20px).</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">📘 Types of CSS:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Inline CSS</li>
                <li>Internal CSS</li>
                <li>External CSS</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">📌 Uses of CSS:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Change text color, font, size, and style.</li>
                <li>Add background colors or images to web pages.</li>
                <li>Adjust spacing (margin, padding) and element alignment.</li>
                <li>Create responsive layouts for different devices.</li>
                <li>Add visual effects like hover, transitions, and animations.</li>
                <li>Design grids, columns, and complex layouts for modern websites.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧠 Advantages of CSS:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Efficiency</li>
                <li>Separation of Concerns</li>
                <li>Consistency</li>
                <li>Flexible Design</li>
                <li>Reduced Code</li>
                <li>Enhanced User Experience</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">⚙️ Limitations of CSS:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Browser compatibility issues can occur with older browsers.</li>
                <li>Limited capabilities compared to full programming languages.</li>
                <li>Complex layouts may require additional frameworks or tools.</li>
                <li>Learning advanced CSS concepts can be challenging for beginners.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">💡 Conclusion:</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                CSS is an essential part of modern web development. It works hand-in-hand with HTML and JavaScript to create websites that are structured, visually appealing, and interactive. Understanding CSS allows developers to build responsive, user-friendly, and professional-looking web pages efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Java Notes Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 animate-fade-in-up">Java Overview</h2>
          <div className="text-center mb-8">
            <button
              onClick={() => setShowJavaNotes(!showJavaNotes)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {showJavaNotes ? 'Hide Notes ☕' : 'View Java Notes ☕'}
            </button>
          </div>
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showJavaNotes ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg border-l-4 border-red-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Java Overview:</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Java is a programming language and computing platform for application development.<br />
                It allows developers to write robust, secure, and portable programs that can run anywhere without modification.<br />
                Its famous slogan is: <strong>"Write Once, Run Anywhere" (WORA)</strong>.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧩 Features of Java:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Simple:</strong> Java has an easy-to-understand syntax, similar to C++, and avoids complex features like pointers.</li>
                <li><strong>Object-Oriented:</strong> Everything in Java is treated as an object, which promotes code reuse, modularity, and scalability.</li>
                <li><strong>Platform Independent:</strong> Java programs run on the JVM, making them portable across different operating systems.</li>
                <li><strong>Secure:</strong> Java provides a secure environment for code execution using its bytecode verification and security APIs.</li>
                <li><strong>Robust:</strong> Strong memory management, exception handling, and type-checking make Java programs reliable.</li>
                <li><strong>Multithreaded:</strong> Java allows multiple threads to run concurrently, making it suitable for high-performance applications.</li>
                <li><strong>Architecture Neutral:</strong> Java code is compiled into bytecode, which is independent of the underlying hardware.</li>
                <li><strong>Distributed:</strong> Java has built-in support for networking and distributed computing.</li>
                <li><strong>High Performance:</strong> Java's Just-In-Time (JIT) compiler converts bytecode into native machine code for faster execution.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧱 Components of Java:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>JVM (Java Virtual Machine):</strong> Runs Java bytecode and provides platform independence.</li>
                <li><strong>JRE (Java Runtime Environment):</strong> Provides libraries and components to run Java programs.</li>
                <li><strong>JDK (Java Development Kit):</strong> Contains tools to write, compile, and run Java programs, including the JRE.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">📘 Uses of Java:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Developing web applications (Java EE, Spring, JSP).</li>
                <li>Building mobile apps, especially Android applications.</li>
                <li>Creating desktop GUI applications using Swing or JavaFX.</li>
                <li>Developing enterprise software for large organizations.</li>
                <li>Designing embedded systems and IoT applications.</li>
                <li>Game development and scientific applications.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧠 Advantages of Java:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Platform independence: Programs run anywhere.</li>
                <li>Object-oriented approach: Easier maintenance and modular code.</li>
                <li>Security: Strong runtime security features.</li>
                <li>Large community: Extensive libraries and support.</li>
                <li>Multithreading: Efficient for modern applications.</li>
                <li>Scalable: Suitable for small apps to large enterprise systems.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">⚙️ Limitations of Java:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Slower than compiled languages like C/C++ because of JVM overhead.</li>
                <li>Memory consumption: Requires more memory than some other languages.</li>
                <li>No low-level programming: Limited access to system resources.</li>
                <li>Verbose syntax: Programs may require more code compared to Python.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">💡 Conclusion:</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Java is one of the most popular and versatile programming languages. Its combination of portability, security, and robustness makes it ideal for developing a wide range of applications. Learning Java provides a strong foundation for object-oriented programming, software development, and modern application development.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* JavaScript Notes Section */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 animate-fade-in-up">JavaScript Notes</h2>
          <div className="text-center mb-8">
            <button
              onClick={() => setShowJsNotes(!showJsNotes)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {showJsNotes ? 'Hide Notes ⚡' : 'View JavaScript Notes ⚡'}
            </button>
          </div>
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showJsNotes ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg border-l-4 border-orange-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">What is JavaScript?</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                JavaScript (JS) is a high-level, interpreted programming language that is primarily used to make web pages interactive.<br />
                It is an essential part of web development, working alongside HTML (structure) and CSS (style) to create dynamic, responsive, and engaging web pages.<br />
                JavaScript runs on the client-side (in the browser) and can also run on the server-side using environments like Node.js.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">📖 Definition:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>JavaScript is a scripting language that enables developers to manipulate web page content, handle events, and control browser behavior.</li>
                <li>It allows for dynamic updates, form validation, animations, and interactive features without requiring the page to reload.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧩 Features of JavaScript:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Client-Side Execution:</strong> Runs in the browser, allowing faster interactions without server requests.</li>
                <li><strong>Lightweight and Easy to Learn:</strong> Syntax is simple, and it is beginner-friendly.</li>
                <li><strong>Dynamic Typing:</strong> Variable types are determined at runtime, making coding flexible.</li>
                <li><strong>Object-Oriented:</strong> Supports objects, classes, and inheritance to structure code effectively.</li>
                <li><strong>Event-Driven Programming:</strong> Handles user actions like clicks, mouse movements, and keyboard inputs.</li>
                <li><strong>Cross-Platform:</strong> Works on all modern browsers and operating systems.</li>
                <li><strong>Interactivity:</strong> Can modify HTML and CSS dynamically to create responsive UI elements.</li>
                <li><strong>Versatility:</strong> Can be used for web development, server-side programming, mobile apps, and desktop applications.</li>
                <li><strong>Integration:</strong> Easily integrates with other technologies like HTML, CSS, and AJAX for modern web apps.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧱 Components of JavaScript:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Variables:</strong> Store data values.</li>
                <li><strong>Functions:</strong> Reusable blocks of code that perform specific tasks.</li>
                <li><strong>Objects:</strong> Collections of properties and methods.</li>
                <li><strong>Events:</strong> Actions triggered by user interactions.</li>
                <li><strong>DOM Manipulation:</strong> Allows JS to dynamically change HTML elements and attributes.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">📘 Uses of JavaScript:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Create dynamic web pages that respond to user actions.</li>
                <li>Perform form validation to ensure proper input.</li>
                <li>Add animations, sliders, and interactive elements.</li>
                <li>Build single-page applications (SPAs) using frameworks like React, Angular, or Vue.js.</li>
                <li>Develop server-side applications with Node.js.</li>
                <li>Handle API requests to fetch or send data without page reloads.</li>
                <li>Game development and mobile app development (e.g., React Native).</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧠 Advantages of JavaScript:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Fast execution: Runs directly in the browser without server interaction.</li>
                <li>Interactive websites: Enhances user experience with dynamic content.</li>
                <li>Versatile: Can be used for frontend and backend development.</li>
                <li>Open Source: Free to use with vast community support.</li>
                <li>Cross-Platform: Works on Windows, macOS, Linux, and mobile devices.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">⚙️ Limitations of JavaScript:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Security issues: Vulnerable if poorly coded (e.g., XSS attacks).</li>
                <li>Browser dependency: Behavior may vary slightly between browsers.</li>
                <li>No access to hardware: Cannot perform low-level operations like C/C++.</li>
                <li>Single-threaded: Heavy computations can block UI unless asynchronous techniques are used.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">💡 Conclusion:</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                JavaScript is a core technology of the web and an essential tool for modern developers.<br />
                It enables dynamic, interactive, and responsive web applications, and its versatility has made it popular for both frontend and backend development.<br />
                Learning JavaScript is crucial for anyone looking to become a professional web developer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Python Notes Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 animate-fade-in-up">Python Notes</h2>
          <div className="text-center mb-8">
            <button
              onClick={() => setShowPythonNotes(!showPythonNotes)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {showPythonNotes ? 'Hide Notes 🐍' : 'View Python Notes 🐍'}
            </button>
          </div>
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showPythonNotes ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">What is Python?</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Python is a high-level, interpreted, and general-purpose programming language created by Guido van Rossum in 1991.<br />
                It is designed to be easy to read, easy to write, and highly versatile, making it popular for beginners and experienced developers alike.<br />
                Python is widely used in web development, data science, artificial intelligence, machine learning, automation, and more.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">📖 Definition:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Python is a programming language that emphasizes code readability and simplicity.</li>
                <li>Its clean syntax allows developers to write programs faster with fewer lines of code compared to other languages.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧩 Features of Python:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Easy to Learn:</strong> Python has simple syntax similar to English, ideal for beginners.</li>
                <li><strong>Interpreted Language:</strong> Python code runs line by line, making debugging easier.</li>
                <li><strong>Dynamically Typed:</strong> Variable types are determined at runtime.</li>
                <li><strong>Object-Oriented:</strong> Supports classes, objects, and inheritance for modular programming.</li>
                <li><strong>Extensive Libraries:</strong> Python has built-in and third-party libraries for web development, data analysis, AI, and more.</li>
                <li><strong>Cross-Platform:</strong> Runs on Windows, Linux, macOS, and other platforms without modification.</li>
                <li><strong>Open Source:</strong> Free to use and has a large supportive community.</li>
                <li><strong>Versatile:</strong> Used for scripting, web apps, AI, ML, automation, and more.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧱 Components of Python:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Variables:</strong> Store data values.</li>
                <li><strong>Functions:</strong> Reusable blocks of code.</li>
                <li><strong>Classes/Objects:</strong> For object-oriented programming.</li>
                <li><strong>Modules & Packages:</strong> Organize code and reuse functionality.</li>
                <li><strong>Exceptions:</strong> Handle errors gracefully.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">📘 Uses of Python:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Web development (Django, Flask)</li>
                <li>Data science and analytics (Pandas, NumPy)</li>
                <li>Artificial Intelligence and Machine Learning (TensorFlow, PyTorch)</li>
                <li>Automation and scripting</li>
                <li>Game development</li>
                <li>Desktop applications</li>
                <li>Internet of Things (IoT) applications</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧠 Advantages of Python:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Easy to learn and read</li>
                <li>Large standard library and community support</li>
                <li>Cross-platform compatibility</li>
                <li>Versatile for multiple programming domains</li>
                <li>Faster development due to simple syntax and libraries</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">⚙️ Limitations of Python:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Slower than compiled languages like C/C++ due to interpretation</li>
                <li>High memory consumption</li>
                <li>Not ideal for mobile app development</li>
                <li>Weak in multithreading due to Global Interpreter Lock (GIL)</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">💡 Conclusion:</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Python is one of the most popular and versatile programming languages in the world.<br />
                Its simplicity, readability, and extensive library support make it suitable for beginners as well as professional developers.<br />
                Learning Python opens opportunities in web development, data science, AI, automation, and more.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* C Programming Notes Section */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 animate-fade-in-up">C Programming Notes</h2>
          <div className="text-center mb-8">
            <button
              onClick={() => setShowCNotes(!showCNotes)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {showCNotes ? 'Hide Notes ⚙️' : 'View C Programming Notes ⚙️'}
            </button>
          </div>
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showCNotes ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg border-l-4 border-yellow-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">What is C?</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                C is a high-level, general-purpose programming language developed by Dennis Ritchie in 1972 at Bell Labs.<br />
                It is widely used for system programming, developing operating systems, embedded systems, and application software.<br />
                C is known for its efficiency, performance, and close-to-hardware capabilities, making it the foundation of many modern programming languages like C++, Java, and Python.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">📖 Definition:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>C is a structured programming language that allows developers to write procedural programs using functions, loops, and conditionals.</li>
                <li>It provides low-level memory access while still being portable across different platforms.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧩 Features of C:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Simple:</strong> Easy to learn and understand for beginners.</li>
                <li><strong>Structured Language:</strong> Supports modular programming with functions.</li>
                <li><strong>Portable:</strong> Programs can be run on different machines with minimal changes.</li>
                <li><strong>Efficient and Fast:</strong> Provides low-level access to memory, suitable for system programming.</li>
                <li><strong>Rich Library Support:</strong> Offers a variety of built-in functions for common tasks.</li>
                <li><strong>Flexibility:</strong> Can handle low-level operations such as memory management using pointers.</li>
                <li><strong>Widely Used:</strong> Foundation for many modern programming languages.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧱 Components of C:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Variables:</strong> Store data values.</li>
                <li><strong>Data Types:</strong> Define the type of variables (int, char, float, double).</li>
                <li><strong>Operators:</strong> Perform arithmetic, relational, logical, and bitwise operations.</li>
                <li><strong>Functions:</strong> Reusable blocks of code.</li>
                <li><strong>Loops and Conditionals:</strong> Control program flow.</li>
                <li><strong>Pointers:</strong> Variables that store memory addresses.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">📘 Uses of C:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>System programming (operating systems, compilers, interpreters)</li>
                <li>Embedded systems and microcontroller programming</li>
                <li>Developing desktop applications</li>
                <li>Game development</li>
                <li>Writing efficient algorithms and data structures</li>
                <li>Foundations for other languages like C++, Java, and Python</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧠 Advantages of C:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Fast and efficient execution</li>
                <li>Provides low-level access to memory</li>
                <li>Portable across platforms</li>
                <li>Supports structured programming</li>
                <li>Extensive library support</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">⚙️ Limitations of C:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>No built-in support for object-oriented programming</li>
                <li>Manual memory management can lead to errors</li>
                <li>Limited standard library compared to modern languages</li>
                <li>No direct support for GUI development</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">💡 Conclusion:</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                C is a powerful and efficient programming language that forms the foundation of modern programming.<br />
                Its combination of speed, low-level memory access, and portability makes it ideal for system programming and embedded applications.<br />
                Learning C provides a strong foundation for understanding programming concepts and other languages.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* C++ Programming Notes Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 animate-fade-in-up">C++ Programming Notes</h2>
          <div className="text-center mb-8">
            <button
              onClick={() => setShowCppNotes(!showCppNotes)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {showCppNotes ? 'Hide Notes 🔧' : 'View C++ Programming Notes 🔧'}
            </button>
          </div>
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showCppNotes ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg border-l-4 border-gray-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">What is C++?</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                C++ is a high-level, general-purpose programming language developed by Bjarne Stroustrup in 1983.<br />
                It is an extension of the C language that includes object-oriented programming (OOP) features.<br />
                C++ is widely used for system programming, game development, desktop applications, and performance-critical software.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">📖 Definition:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>C++ is a procedural and object-oriented programming language that allows developers to create both low-level and high-level applications efficiently.</li>
                <li>It combines the power of C with additional features like classes, objects, inheritance, and polymorphism.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧩 Features of C++:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Object-Oriented:</strong> Supports classes, objects, inheritance, polymorphism, and encapsulation.</li>
                <li><strong>High Performance:</strong> Provides low-level memory access and efficient execution.</li>
                <li><strong>Rich Standard Library:</strong> Includes STL (Standard Template Library) with pre-built data structures and algorithms.</li>
                <li><strong>Portable:</strong> Programs can run on different platforms with minimal changes.</li>
                <li><strong>Multi-Paradigm:</strong> Supports procedural, object-oriented, and generic programming.</li>
                <li><strong>Memory Management:</strong> Allows dynamic memory allocation using pointers.</li>
                <li><strong>Backwards Compatible with C:</strong> Most C programs can be compiled with a C++ compiler.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧱 Components of C++:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Variables and Data Types:</strong> Store data values like int, char, float, double.</li>
                <li><strong>Functions:</strong> Reusable blocks of code.</li>
                <li><strong>Classes and Objects:</strong> For OOP implementation.</li>
                <li><strong>Constructors/Destructors:</strong> Special functions for object initialization and cleanup.</li>
                <li><strong>Inheritance:</strong> Code reusability through parent-child class relationships.</li>
                <li><strong>Polymorphism:</strong> Ability of functions or objects to take multiple forms.</li>
                <li><strong>Pointers:</strong> Variables storing memory addresses for direct memory access.</li>
                <li><strong>Templates and STL:</strong> Generic programming and pre-built data structures/algorithms.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">📘 Uses of C++:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>System programming (operating systems, drivers, compilers)</li>
                <li>Game development and graphics programming</li>
                <li>Desktop applications and GUI development</li>
                <li>High-performance applications</li>
                <li>Real-time simulations and embedded systems</li>
                <li>Implementing algorithms and data structures</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧠 Advantages of C++:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>High performance and efficient memory usage</li>
                <li>Supports both procedural and object-oriented programming</li>
                <li>Large library support including STL</li>
                <li>Portable and widely used in industry</li>
                <li>Backwards compatible with C</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">⚙️ Limitations of C++:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Complex syntax for beginners compared to Python</li>
                <li>Manual memory management can lead to errors</li>
                <li>No built-in garbage collection</li>
                <li>Longer development time for large projects compared to higher-level languages</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">💡 Conclusion:</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                C++ is a powerful and versatile programming language combining low-level memory access with high-level OOP features.<br />
                It is widely used in software development, game programming, system programming, and performance-critical applications.<br />
                Learning C++ provides a strong foundation for understanding object-oriented programming and advanced programming concepts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Aptitude Notes Section */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 animate-fade-in-up">Aptitude Notes</h2>
          <div className="text-center mb-8">
            <button
              onClick={() => setShowAptitudeNotes(!showAptitudeNotes)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {showAptitudeNotes ? 'Hide Notes 🧠' : 'View Aptitude Notes 🧠'}
            </button>
          </div>
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showAptitudeNotes ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg border-l-4 border-indigo-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">What is Aptitude?</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Aptitude refers to a person's natural ability to perform certain tasks or skills.<br />
                In education and job selection, aptitude usually refers to logical reasoning, numerical ability, and problem-solving skills.<br />
                Aptitude tests are commonly used in competitive exams, campus placements, and recruitment processes to evaluate candidates.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">📖 Definition:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Aptitude is the innate or learned capability to understand concepts, solve problems, and apply logic efficiently.</li>
                <li>It includes quantitative, logical, verbal, and analytical abilities.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧩 Features of Aptitude:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Problem-Solving Skills:</strong> Ability to analyze and solve problems efficiently.</li>
                <li><strong>Logical Reasoning:</strong> Understand patterns, sequences, and relationships.</li>
                <li><strong>Numerical Ability:</strong> Ability to work with numbers, percentages, ratios, and data interpretation.</li>
                <li><strong>Verbal Ability:</strong> Understand and analyze written information.</li>
                <li><strong>Analytical Thinking:</strong> Make decisions based on facts and patterns.</li>
                <li><strong>Quick Learning:</strong> Adapt and solve new types of problems quickly.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧱 Components of Aptitude:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Quantitative Aptitude:</strong> Numbers, percentages, ratios, algebra, time-speed-distance, profit-loss, etc.</li>
                <li><strong>Logical Reasoning:</strong> Puzzles, seating arrangements, coding-decoding, series, blood relations, etc.</li>
                <li><strong>Verbal Aptitude:</strong> Grammar, comprehension, vocabulary, sentence correction, etc.</li>
                <li><strong>Data Interpretation:</strong> Tables, charts, graphs, and statistics.</li>
                <li><strong>Problem Solving:</strong> Ability to analyze situations and find solutions quickly.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">📘 Uses of Aptitude:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Evaluate candidates in job interviews and campus placements</li>
                <li>Prepare for competitive exams like CAT, GRE, GATE, and SSC</li>
                <li>Enhance analytical and problem-solving skills</li>
                <li>Build logical thinking and reasoning capabilities</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">🧠 Advantages of Aptitude:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Improves problem-solving and critical thinking skills</li>
                <li>Helps in career growth and recruitment</li>
                <li>Enhances logical and analytical abilities</li>
                <li>Prepares students for competitive and professional exams</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">⚙️ Limitations of Aptitude:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Aptitude tests do not measure creativity or emotional intelligence</li>
                <li>May be stressful under time constraints</li>
                <li>Requires consistent practice and preparation</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">💡 Conclusion:</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Aptitude is a key skill for academic, professional, and personal success.<br />
                Developing strong aptitude skills helps individuals analyze problems efficiently, think logically, and perform well in competitive environments.<br />
                Regular practice in quantitative, logical, verbal, and analytical areas improves overall performance in exams, interviews, and real-life problem-solving.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;