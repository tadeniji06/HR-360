import { useState } from 'react';

const ReportsTable = ({ reports }) => {
  const [selectedReport, setSelectedReport] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'On Hold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  const closeModal = () => {
    setSelectedReport(null);
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deliverables
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Week Targets
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report, index) => (
              <tr key={report._id || report.id || index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{report.brand}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {report.deliverables?.length || 0} deliverable(s)
                  </div>
                  <div className="text-xs text-gray-500">
                    {report.deliverables?.slice(0, 2).map((deliverable, idx) => (
                      <div key={idx} className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(deliverable.status)}`}>
                          {deliverable.status}
                        </span>
                        <span className="truncate max-w-32">{deliverable.title}</span>
                      </div>
                    ))}
                    {report.deliverables?.length > 2 && (
                      <div className="text-xs text-gray-400 mt-1">
                        +{report.deliverables.length - 2} more
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {report.nextWeekTargets?.length || 0} target(s)
                  </div>
                  <div className="text-xs text-gray-500">
                    {report.nextWeekTargets?.slice(0, 2).map((target, idx) => (
                      <div key={idx} className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(target.priority)}`}>
                          {target.priority}
                        </span>
                        <span className="truncate max-w-32">{target.title}</span>
                      </div>
                    ))}
                    {report.nextWeekTargets?.length > 2 && (
                      <div className="text-xs text-gray-400 mt-1">
                        +{report.nextWeekTargets.length - 2} more
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(report.createdAt || report.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewReport(report)}
                    className="text-blue-600 hover:text-blue-900 transition-colors"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {reports.map((report, index) => (
          <div key={report._id || report.id || index} className="bg-white rounded-lg shadow border border-gray-200 p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{report.brand}</h3>
              <button
                onClick={() => handleViewReport(report)}
                className="text-blue-600 hover:text-blue-900 text-sm font-medium"
              >
                View Details
              </button>
            </div>
            
            <div className="space-y-3">
              {/* Deliverables */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Deliverables ({report.deliverables?.length || 0})
                </p>
                <div className="space-y-1">
                  {report.deliverables?.slice(0, 2).map((deliverable, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(deliverable.status)}`}>
                        {deliverable.status}
                      </span>
                      <span className="text-xs text-gray-600 truncate flex-1">{deliverable.title}</span>
                    </div>
                  ))}
                  {report.deliverables?.length > 2 && (
                    <p className="text-xs text-gray-400">+{report.deliverables.length - 2} more</p>
                  )}
                </div>
              </div>

              {/* Next Week Targets */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Next Week Targets ({report.nextWeekTargets?.length || 0})
                </p>
                <div className="space-y-1">
                  {report.nextWeekTargets?.slice(0, 2).map((target, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(target.priority)}`}>
                        {target.priority}
                      </span>
                      <span className="text-xs text-gray-600 truncate flex-1">{target.title}</span>
                    </div>
                  ))}
                  {report.nextWeekTargets?.length > 2 && (
                    <p className="text-xs text-gray-400">+{report.nextWeekTargets.length - 2} more</p>
                  )}
                </div>
              </div>

              {/* Created Date */}
              <div>
                <p className="text-xs text-gray-500">
                  Created: {formatDate(report.createdAt || report.created_at)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for viewing report details */}
      {selectedReport && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
          <div className="relative mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white mt-4 sm:mt-20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 pr-4">
                Report Details - {selectedReport.brand}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Deliverables Section */}
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-3">Deliverables</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedReport.deliverables?.map((deliverable, idx) => (
                    <div key={idx} className="p-3 border rounded-lg bg-gray-50">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                        <span className="font-medium text-sm">{deliverable.title}</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full self-start sm:self-auto ${getStatusColor(deliverable.status)}`}>
                          {deliverable.status}
                        </span>
                      </div>
                      {deliverable.description && (
                        <p className="text-xs text-gray-600">{deliverable.description}</p>
                      )}
                      {deliverable.dueDate && (
                        <p className="text-xs text-gray-500 mt-1">
                          Due: {formatDate(deliverable.dueDate)}
                        </p>
                      )}
                    </div>
                  )) || <p className="text-gray-500">No deliverables found</p>}
                </div>
              </div>

              {/* Next Week Targets Section */}
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-3">Next Week Targets</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedReport.nextWeekTargets?.map((target, idx) => (
                    <div key={idx} className="p-3 border rounded-lg bg-gray-50">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                        <span className="font-medium text-sm">{target.title}</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full self-start sm:self-auto ${getPriorityColor(target.priority)}`}>
                          {target.priority}
                        </span>
                      </div>
                      {target.description && (
                        <p className="text-xs text-gray-600">{target.description}</p>
                      )}
                      {target.deadline && (
                        <p className="text-xs text-gray-500 mt-1">
                          Deadline: {formatDate(target.deadline)}
                        </p>
                      )}
                    </div>
                  )) || <p className="text-gray-500">No targets found</p>}
                </div>
              </div>
            </div>

            {/* Additional Report Info */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Created Date:</span>
                  <p className="text-sm text-gray-900">{formatDate(selectedReport.createdAt || selectedReport.created_at)}</p>
                </div>
                {selectedReport.updatedAt && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Last Updated:</span>
                    <p className="text-sm text-gray-900">{formatDate(selectedReport.updatedAt)}</p>
                  </div>
                )}
                {selectedReport.author && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Author:</span>
                    <p className="text-sm text-gray-900">{selectedReport.author}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportsTable;