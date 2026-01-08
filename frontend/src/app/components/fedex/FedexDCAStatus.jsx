import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Download, LayoutDashboard, Eye, Edit, Users, LogOut } from 'lucide-react';

function FedexDCAStatus() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const navigationItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/fedex/dashboard' },
    { name: 'View', icon: Eye, path: '/fedex/view' },
    { name: 'Update', icon: Edit, path: '/fedex/update' },
    { name: 'DCA Status', icon: Users, path: '/fedex/dca-status', active: true }
  ];

  // Mock DCA status data
  const dcaData = [
    { id: 1, name: 'John Smith', address: '123 Oak St, City, ST', phone: '(555) 123-4567', debt: '$1,250.00', dueDate: '01/15/2026', status: 'First Call', response: 'Will pay next week' },
    { id: 2, name: 'Sarah Johnson', address: '456 Pine Ave, City, ST', phone: '(555) 234-5678', debt: '$2,100.00', dueDate: '01/20/2026', status: 'Attended', response: 'Partial payment made' },
    { id: 3, name: 'Mike Williams', address: '789 Elm Dr, City, ST', phone: '(555) 345-6789', debt: '$875.50', dueDate: '01/18/2026', status: 'Not Attended', response: 'No response' },
    { id: 4, name: 'Emily Davis', address: '321 Maple Ln, City, ST', phone: '(555) 456-7890', debt: '$3,450.00', dueDate: '01/22/2026', status: 'Attended', response: 'Discussed payment plan' },
    { id: 5, name: 'Robert Brown', address: '654 Birch Ct, City, ST', phone: '(555) 567-8901', debt: '$1,890.00', dueDate: '01/25/2026', status: 'First Call', response: 'Requested extension' },
    { id: 6, name: 'Lisa Wilson', address: '987 Cedar Way, City, ST', phone: '(555) 678-9012', debt: '$4,200.00', dueDate: '01/28/2026', status: 'Not Attended', response: 'Phone disconnected' },
    { id: 7, name: 'David Martinez', address: '147 Spruce Rd, City, ST', phone: '(555) 789-0123', debt: '$950.75', dueDate: '01/19/2026', status: 'Attended', response: 'Payment confirmed' },
    { id: 8, name: 'Jennifer Taylor', address: '258 Willow St, City, ST', phone: '(555) 890-1234', debt: '$2,675.00', dueDate: '01/24/2026', status: 'First Call', response: 'Reviewing options' }
  ];

  const filteredData = dcaData.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const handleExport = () => {
    const headers = ['Name', 'Address', 'Phone No', 'Debt', 'Due Date', 'Status', 'Response'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => 
        [row.name, row.address, row.phone, row.debt, row.dueDate, row.status, row.response].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dca_status_${filter}_${new Date().toISOString().split('T')[0]}.csv`;
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
            <h1 className="text-3xl font-bold text-gray-800">DCA Status</h1>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all shadow-lg"
            >
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Filter by Status</h2>
            </div>
            <div className="flex gap-4 flex-wrap">
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
                onClick={() => setFilter('First Call')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  filter === 'First Call'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                First Call
              </button>
              <button
                onClick={() => setFilter('Attended')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  filter === 'Attended'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Attended
              </button>
              <button
                onClick={() => setFilter('Not Attended')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  filter === 'Not Attended'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Not Attended
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
                    <th className="px-6 py-4 text-left font-semibold">Response</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-800 font-medium">{row.name}</td>
                      <td className="px-6 py-4 text-gray-600">{row.address}</td>
                      <td className="px-6 py-4 text-gray-600">{row.phone}</td>
                      <td className="px-6 py-4 text-gray-800 font-semibold">{row.debt}</td>
                      <td className="px-6 py-4 text-gray-600">{row.dueDate}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            row.status === 'First Call'
                              ? 'bg-blue-100 text-blue-700'
                              : row.status === 'Attended'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{row.response}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 text-center text-gray-600">
            Showing {filteredData.length} record{filteredData.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FedexDCAStatus;
