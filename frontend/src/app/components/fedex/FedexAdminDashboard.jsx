import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Upload,
  BarChart3,
  Activity,
  LogOut,
  LayoutDashboard,
  Eye,
  Edit,
  Users,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

function FedexAdminDashboard({
  customerData,
  setCustomerData,
  uploadedData,
  setUploadedData,
  uploadedFileName,
  setUploadedFileName,
}) {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const paymentData = [
    { name: "Partially Paid", value: 45, count: 119 },
    { name: "Unpaid", value: 55, count: 81 },
  ];

  const dcaPerformanceData = {
    firstCall: { total: 200, completed: 119 },
    attended: { total: 200, completed: 90 },
    notAttended: { total: 200, completed: 29 },
  };

  const COLORS = ["#3B82F6", "#EF4444"];

  // ✅ File selection
  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setUploadedFileName(selectedFile.name);
    setUploadedData(false);
  };

  // ✅ Send CSV to backend → Python model
  const handleSubmit = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ ADD HERE (VERY IMPORTANT)
      console.log("✅ Backend raw response:", res.data);

      // ✅ Backend returns JSON with priority
      const processedData = res.data.map((item, index) => ({
        id: index + 1,
        customer_name: item.customer_name,
        address: item.address,
        phone: item.phone,
        amount: `₹${item.amount}`,
        due_days: item.due_days,
        status: item.status || "Unpaid",
        priority: item.priority,
      }));

      setCustomerData(processedData);
      setUploadedData(true);
    } catch (err) {
      alert("Error processing file");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const navigationItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/fedex/dashboard",
      active: true,
    },
    { name: "View", icon: Eye, path: "/fedex/view" },
    { name: "Update", icon: Edit, path: "/fedex/update" },
    { name: "DCA Status", icon: Users, path: "/fedex/dca-status" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-600">CLEAN LEDGER</h2>
          <p className="text-sm text-gray-600">Admin Portal</p>
        </div>

        <nav className="flex-1 p-4">
          {navigationItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
                item.active
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </nav>

        <button
          onClick={() => navigate("/")}
          className="m-4 flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Upload */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Upload className="text-blue-600" />
            <h2 className="text-xl font-semibold">Upload Customer Details</h2>
          </div>

          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="w-full border rounded-lg px-4 py-2 mb-4"
          />

          <button
            onClick={handleSubmit}
            disabled={!file || loading}
            className={`px-6 py-2 rounded-lg font-semibold ${
              file
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? "Processing..." : "Submit"}
          </button>

          {uploadedFileName && (
            <p className="text-sm text-green-600 mt-2">
              Selected: {uploadedFileName}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FedexAdminDashboard;
