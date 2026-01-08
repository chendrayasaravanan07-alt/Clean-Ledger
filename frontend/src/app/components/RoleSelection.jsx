import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, User, ArrowLeft } from "lucide-react";

function RoleSelection() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(null);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (role) => {
    if (!loginData.email || !loginData.password) {
      alert("Please enter email and password");
      return;
    }

    // Store login info (Mock Authentication)
    localStorage.setItem(
      "clearledger_user",
      JSON.stringify({
        role: role,               // "fedex" or "dca"
        email: loginData.email,
        loginTime: new Date().toISOString(),
      })
    );

    // Navigate based on role
    if (role === "fedex") {
      navigate("/fedex/dashboard");
    } else {
      navigate("/dca/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
      {/* Back Button */}
      <button
        onClick={() => (showLogin ? setShowLogin(null) : navigate("/"))}
        className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Select Your Role
        </h1>

        {!showLogin ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FEDEX ADMIN */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                FEDEX ADMIN
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Manage customer cases, monitor DCA performance, and track SLA compliance
              </p>
              <button
                onClick={() => setShowLogin("fedex")}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-semibold"
              >
                Login as Admin
              </button>
            </div>

            {/* DCA MANAGER */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                DCA MANAGER
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Work on assigned cases, update call status, and manage escalations
              </p>
              <button
                onClick={() => setShowLogin("dca")}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-3 rounded-lg font-semibold"
              >
                Login as DCA Manager
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div
                className={`w-20 h-20 bg-gradient-to-br ${
                  showLogin === "fedex"
                    ? "from-blue-500 to-blue-600"
                    : "from-indigo-500 to-indigo-600"
                } rounded-2xl flex items-center justify-center mx-auto mb-6`}
              >
                {showLogin === "fedex" ? (
                  <Shield className="w-10 h-10 text-white" />
                ) : (
                  <User className="w-10 h-10 text-white" />
                )}
              </div>

              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                {showLogin === "fedex"
                  ? "FEDEX Admin Login"
                  : "DCA Manager Login"}
              </h2>

              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                />

                <button
                  onClick={() => handleLogin(showLogin)}
                  className={`w-full ${
                    showLogin === "fedex"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } text-white py-3 rounded-lg font-semibold`}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoleSelection;
