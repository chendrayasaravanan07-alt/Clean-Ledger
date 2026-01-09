import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  AlertCircle,
  FileText,
  LogOut,
  Eye,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function DCAManagerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dca/dashboard" },
    { name: "View Cases", icon: Eye, path: "/dca/view-cases" },
    { name: "Alerts", icon: AlertCircle, path: "/dca/alerts" },
    { name: "Case Notes", icon: FileText, path: "/dca/case-notes" },
  ];

  // Mock case data
  const caseData = [
    { name: "Total Cases", value: 156 },
    { name: "Active Cases", value: 89 },
    { name: "Closed Cases", value: 67 },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-indigo-600">CLEAN LEDGER</h2>
          <p className="text-sm text-gray-600 mt-1">DCA Manager</p>
        </div>

        <nav className="flex-1 p-4">
          {navigationItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                location.pathname === item.path
                  ? "bg-indigo-50 text-indigo-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="m-4 flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back! Here's an overview of your cases.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold">Total Cases</h3>
              <p className="text-4xl font-bold mt-2">156</p>
              <p className="text-blue-100 text-sm">All assigned cases</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold">Active Cases</h3>
              <p className="text-4xl font-bold mt-2">89</p>
              <p className="text-green-100 text-sm">
                Currently in progress
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold">Closed Cases</h3>
              <p className="text-4xl font-bold mt-2">67</p>
              <p className="text-indigo-100 text-sm">
                Successfully resolved
              </p>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Case Overview
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={caseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  fill="#6366F1"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate("/dca/alerts")}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Alerts
                  </h3>
                  <p className="text-gray-600 text-sm">
                    SLA breach risk customers
                  </p>
                </div>
              </div>
              <span className="text-indigo-600 font-medium">
                View Alerts →
              </span>
            </div>

            <div
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate("/dca/case-notes")}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Case Notes
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Audit logs & remarks
                  </p>
                </div>
              </div>
              <span className="text-indigo-600 font-medium">
                Manage Notes →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DCAManagerDashboard;
