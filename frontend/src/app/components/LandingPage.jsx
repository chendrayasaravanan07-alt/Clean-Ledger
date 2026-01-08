import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center flex flex-col items-center justify-center h-full">

        {/* Logo/Icon */}
        <div className="mb-6 flex justify-center">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-5 rounded-3xl shadow-2xl">
            <TrendingUp className="w-14 h-14 text-white" />
          </div>
        </div>

        {/* Application Name */}
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          CLEAN LEDGER
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Reimagining DCA management through a centralized, intelligent, and AI-powered platform
        </p>

        {/* Explore Button */}
        <button
          onClick={() => navigate('/role-selection')}
          className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
        >
          Explore
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Feature Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
          <div className="bg-white p-5 rounded-2xl shadow-lg">
            <div className="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-800 mb-1">Centralized</h3>
            <p className="text-gray-600 text-sm">Manage all DCA operations from one platform</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-lg">
            <div className="w-11 h-11 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-800 mb-1">Intelligent</h3>
            <p className="text-gray-600 text-sm">Smart insights and analytics</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-lg">
            <div className="w-11 h-11 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-800 mb-1">AI-Powered</h3>
            <p className="text-gray-600 text-sm">AI-driven decision support</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LandingPage;
