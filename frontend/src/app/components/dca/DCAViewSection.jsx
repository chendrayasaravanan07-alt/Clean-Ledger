import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Filter,
  Download,
  LayoutDashboard,
  Eye,
  AlertCircle,
  FileText,
  LogOut
} from 'lucide-react';

function DCAViewSection({ customerData = [] }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  // Debug data
  useEffect(() => {
    console.log('📦 Data received for DCA:', customerData);
    if (customerData.length > 0) {
      console.table(customerData);
    }
  }, [customerData]);

  const navigationItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dca/dashboard' },
    { name: 'View Cases', icon: Eye, path: '/dca/view-cases' },
    { name: 'Alerts', icon: AlertCircle, path: '/dca/alerts' },
    { name: 'Case Notes', icon: FileText, path: '/dca/case-notes' }
  ];

  const filteredData = Array.isArray(customerData)
    ? customerData.filter(item => {
        if (filter === 'all') return true;
        return item.status === filter;
      })
    : [];

  const handleExport = () => {
    const headers = [
      'Customer Name',
      'Address',
      'Phone',
      'Amount',
      'Due Days',
      'Status',
      'Priority'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredData.map(row =>
        [
          row.customer_name,
          row.address,
          row.phone,
          row.amount,
          row.due_days,
          row.status,
          row.priority
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `dca_customer_data_${filter}_${new Date()
      .toISOString()
      .split('T')[0]}.csv`;
    a.click();
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
          {navigationItems.map(item => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
                item.active
                  ? 'bg-indigo-50 text-indigo-600 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </nav>

        <button
          onClick={() => navigate('/')}
          className="m-4 flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              View Customer Cases
            </h1>

            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
            >
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>

          {/* Filter */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Filter Cases</h2>
            </div>

            <div className="flex gap-4">
              {['all', 'Partially Paid', 'Unpaid'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    filter === type
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {type === 'all' ? 'All' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Address</th>
                    <th className="px-6 py-4 text-left">Phone</th>
                    <th className="px-6 py-4 text-left">Amount</th>
                    <th className="px-6 py-4 text-left">Due Days</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Priority</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredData.length > 0 ? (
                    filteredData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{row.customer_name}</td>
                        <td className="px-6 py-4">{row.address}</td>
                        <td className="px-6 py-4">{row.phone}</td>
                        <td className="px-6 py-4 font-semibold">
                          {row.amount}
                        </td>
                        <td className="px-6 py-4">{row.due_days} days</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              row.status === 'Partially Paid'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              row.priority === 'High'
                                ? 'bg-red-100 text-red-700'
                                : row.priority === 'Medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {row.priority}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No data available. Upload customer data first.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {filteredData.length > 0 && (
            <div className="mt-4 text-center text-gray-600">
              Showing {filteredData.length} record
              {filteredData.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DCAViewSection;
