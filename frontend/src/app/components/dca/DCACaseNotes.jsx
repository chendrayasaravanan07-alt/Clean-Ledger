import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, AlertCircle, FileText, LogOut, Plus, Search, Calendar } from 'lucide-react';

function DCACaseNotes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([
    {
      id: 1,
      caseId: 'CASE-001',
      customerName: 'John Smith',
      date: '2026-01-07 10:30 AM',
      author: 'DCA Manager',
      note: 'Initial contact made. Customer requested payment extension.',
      type: 'Contact'
    },
    {
      id: 2,
      caseId: 'CASE-002',
      customerName: 'Sarah Johnson',
      date: '2026-01-07 11:15 AM',
      author: 'DCA Manager',
      note: 'Payment plan discussed. Customer agreed to weekly installments.',
      type: 'Payment Plan'
    },
    {
      id: 3,
      caseId: 'CASE-003',
      customerName: 'Mike Williams',
      date: '2026-01-07 02:00 PM',
      author: 'DCA Manager',
      note: 'Unable to reach customer. Left voicemail with callback number.',
      type: 'Attempted Contact'
    }
  ]);

  const [newNote, setNewNote] = useState({
    caseId: '',
    customerName: '',
    note: '',
    type: 'General'
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const navigationItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dca/dashboard' },
    { name: 'Alerts', icon: AlertCircle, path: '/dca/alerts' },
    { name: 'Case Notes', icon: FileText, path: '/dca/case-notes', active: true }
  ];

  const noteTypes = ['General', 'Contact', 'Payment Plan', 'Attempted Contact', 'Follow-up', 'Resolved'];

  const handleAddNote = () => {
    if (!newNote.caseId || !newNote.customerName || !newNote.note) {
      alert('Please fill in all required fields');
      return;
    }

    const note = {
      id: notes.length + 1,
      ...newNote,
      date: new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      author: 'DCA Manager'
    };

    setNotes([note, ...notes]);
    setNewNote({ caseId: '', customerName: '', note: '', type: 'General' });
    setShowAddForm(false);
  };

  const filteredNotes = notes.filter(note =>
    note.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.note.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Case Notes & Audit Logs</h1>
              <p className="text-gray-600">Track all case interactions and internal remarks</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Note
            </button>
          </div>

          {/* Add Note Form */}
          {showAddForm && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Note</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Case ID *
                  </label>
                  <input
                    type="text"
                    value={newNote.caseId}
                    onChange={(e) => setNewNote({ ...newNote, caseId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="e.g., CASE-004"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    value={newNote.customerName}
                    onChange={(e) => setNewNote({ ...newNote, customerName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="Customer name"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note Type
                  </label>
                  <select
                    value={newNote.type}
                    onChange={(e) => setNewNote({ ...newNote, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  >
                    {noteTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Internal Remarks *
                  </label>
                  <textarea
                    value={newNote.note}
                    onChange={(e) => setNewNote({ ...newNote, note: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                    rows="4"
                    placeholder="Enter your remarks and observations..."
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddNote}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all"
                >
                  Save Note
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewNote({ caseId: '', customerName: '', note: '', type: 'General' });
                  }}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 outline-none text-gray-700"
                placeholder="Search notes by case ID, customer name, or content..."
              />
            </div>
          </div>

          {/* Notes List */}
          <div className="space-y-4">
            {filteredNotes.map((note) => (
              <div key={note.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{note.customerName}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {note.caseId}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                          {note.type}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{note.note}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{note.date}</span>
                        </div>
                        <span>•</span>
                        <span>By {note.author}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredNotes.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No notes found</p>
                <p className="text-gray-400 text-sm mt-2">
                  {searchTerm ? 'Try adjusting your search terms' : 'Add your first case note to get started'}
                </p>
              </div>
            )}
          </div>

          {filteredNotes.length > 0 && (
            <div className="mt-6 text-center text-gray-600">
              Showing {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DCACaseNotes;
