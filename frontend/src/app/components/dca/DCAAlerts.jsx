import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, AlertCircle, FileText, LogOut, Download, Clock, AlertTriangle } from 'lucide-react';

function DCAAlerts() {
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dca/dashboard' },
    { name: 'Alerts', icon: AlertCircle, path: '/dca/alerts', active: true },
    { name: 'Case Notes', icon: FileText, path: '/dca/case-notes' }
  ];

  // Mock alerts data
  const alertsData = [
    { 
      id: 1, 
      name: 'John Smith', 
      address: '123 Oak St, City, ST', 
      phone: '(555) 123-4567', 
      debt: '$1,250.00', 
      dueDate: '01/15/2026',
      callAttended: 'No',
      slaBreachDays: 2
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      address: '456 Pine Ave, City, ST', 
      phone: '(555) 234-5678', 
      debt: '$2,100.00', 
      dueDate: '01/16/2026',
      callAttended: 'Yes',
      slaBreachDays: 1
    },
    { 
      id: 3, 
      name: 'Mike Williams', 
      address: '789 Elm Dr, City, ST', 
      phone: '(555) 345-6789', 
      debt: '$875.50', 
      dueDate: '01/14/2026',
      callAttended: 'No',
      slaBreachDays: 3
    },
    { 
      id: 4, 
      name: 'Emily Davis', 
      address: '321 Maple Ln, City, ST', 
      phone: '(555) 456-7890', 
      debt: '$3,450.00', 
      dueDate: '01/17/2026',
      callAttended: 'No',
      slaBreachDays: 2
    },
    { 
      id: 5, 
      name: 'Robert Brown', 
      address: '654 Birch Ct, City, ST', 
      phone: '(555) 567-8901', 
      debt: '$1,890.00', 
      dueDate: '01/15/2026',
      callAttended: 'Yes',
      slaBreachDays: 1
    }
  ];

  const handleExport = () => {
    const headers = ['Name', 'Address', 'Phone No', 'Debt', 'Due Date', 'Call Attended', 'SLA Breach'];
    const csvContent = [
      headers.join(','),
      ...alertsData.map(row => 
        [row.name, row.address, row.phone, row.debt, row.dueDate, row.callAttended, `Breach in ${row.slaBreachDays} days`].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sla_alerts_${new Date().toISOString().split('T')[0]}.csv`;
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
          {navigationItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
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
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">SLA Alerts</h1>
              <p className="text-gray-600">Customers with SLA breach risk within 2 days</p>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all shadow-lg"
            >
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>

          {/* Alert Banner */}
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-8 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-1">
                {alertsData.length} Critical Alerts
              </h3>
              <p className="text-red-700">
                These customers require immediate attention to avoid SLA breach
              </p>
            </div>
          </div>

          {/* Alerts Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Address</th>
                    <th className="px-6 py-4 text-left font-semibold">Phone No</th>
                    <th className="px-6 py-4 text-left font-semibold">Debt</th>
                    <th className="px-6 py-4 text-left font-semibold">Due Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Call Attended</th>
                    <th className="px-6 py-4 text-left font-semibold">SLA Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {alertsData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-800 font-medium">{row.name}</td>
                      <td className="px-6 py-4 text-gray-600">{row.address}</td>
                      <td className="px-6 py-4 text-gray-600">{row.phone}</td>
                      <td className="px-6 py-4 text-gray-800 font-semibold">{row.debt}</td>
                      <td className="px-6 py-4 text-gray-600">{row.dueDate}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            row.callAttended === 'Yes'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {row.callAttended}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Clock className={`w-4 h-4 ${
                            row.slaBreachDays === 1 ? 'text-red-600' : 
                            row.slaBreachDays === 2 ? 'text-orange-600' : 
                            'text-yellow-600'
                          }`} />
                          <span className={`text-sm font-medium ${
                            row.slaBreachDays === 1 ? 'text-red-700' : 
                            row.slaBreachDays === 2 ? 'text-orange-700' : 
                            'text-yellow-700'
                          }`}>
                            Breach in {row.slaBreachDays} day{row.slaBreachDays !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Total Alerts</span>
                <AlertCircle className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="text-3xl font-bold text-gray-800">{alertsData.length}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Not Attended</span>
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-3xl font-bold text-red-600">
                {alertsData.filter(a => a.callAttended === 'No').length}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Critical (1 day)</span>
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-3xl font-bold text-red-600">
                {alertsData.filter(a => a.slaBreachDays === 1).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DCAAlerts;
