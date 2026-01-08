import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Download, Save, Trash2, LayoutDashboard, Eye, Edit, Users, LogOut } from 'lucide-react';

function FedexUpdateSection({ customerData, setCustomerData }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [localData, setLocalData] = useState(customerData);

  const navigationItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/fedex/dashboard' },
    { name: 'View', icon: Eye, path: '/fedex/view' },
    { name: 'Update', icon: Edit, path: '/fedex/update', active: true },
    { name: 'DCA Status', icon: Users, path: '/fedex/dca-status' }
  ];

  const filteredData = localData.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this customer?')) {
      setLocalData(localData.filter(item => item.id !== id));
    }
  };

  const handleSave = () => {
    setCustomerData(localData);
    alert('Changes saved successfully!');
    navigate('/fedex/view');
  };

  const handleExport = () => {
    const headers = ['Name', 'Address', 'Phone No', 'Debt', 'Due Date', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => 
        [row.name, row.address, row.phone, row.debt, row.dueDate, row.status].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `updated_customer_data_${filter}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-600">CLEAN LEDGER</h2>
          <p className="text-sm text-gray-600 mt-1">Admin Portal</p>
        </div>

        <nav className="flex-1 p-4">
          {navigationItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                item.active
                  ? 'bg-blue-50 text-blue-600 font-semibold'
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
          className="m-4 flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Update Customer Data</h1>
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg"
              >
                <Save className="w-5 h-5" />
                Save
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all shadow-lg"
              >
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Filter</h2>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('Partially Paid')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  filter === 'Partially Paid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Partially Paid
              </button>
              <button
                onClick={() => setFilter('Unpaid')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  filter === 'Unpaid'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Unpaid
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Address</th>
                    <th className="px-6 py-4 text-left font-semibold">Phone No</th>
                    <th className="px-6 py-4 text-left font-semibold">Debt</th>
                    <th className="px-6 py-4 text-left font-semibold">Due Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.length > 0 ? (
                    filteredData.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-gray-800">{row.name}</td>
                        <td className="px-6 py-4 text-gray-600">{row.address}</td>
                        <td className="px-6 py-4 text-gray-600">{row.phone}</td>
                        <td className="px-6 py-4 text-gray-800 font-semibold">{row.debt}</td>
                        <td className="px-6 py-4 text-gray-600">{row.dueDate}</td>
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
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Remove customer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                        No data available. Please upload customer data from the dashboard.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {filteredData.length > 0 && (
            <div className="mt-4 text-center text-gray-600">
              Showing {filteredData.length} record{filteredData.length !== 1 ? 's' : ''} (Total: {localData.length})
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FedexUpdateSection;
