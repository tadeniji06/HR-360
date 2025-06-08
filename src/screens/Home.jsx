import { useState, useEffect } from "react";
import { useAuth } from "../context/UseAuth";
import { getReports } from "../functions/reportFunctions";
import CreateReportModal from "../components/CreateReportModal";
import ReportsTable from "../components/ReportsTable";

const Home = () => {
  const { user, logout } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getReports();
      setReports(data.reports || data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setError("Failed to load reports. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleCreateReport = () => {
    setIsCreateModalOpen(true);
  };

  const handleModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleReportCreated = () => {
    fetchReports();
    setIsCreateModalOpen(false);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 space-y-4 sm:space-y-0'>
            <div>
              <h1 className='text-xl sm:text-2xl font-bold text-gray-900 break-words'>
                Welcome back, {user?.name || "User"}!
              </h1>
              <p className='text-sm text-gray-600 font-bold'>
                Email: {user?.email}
              </p>
              <p className='text-sm text-gray-600 font-bold'>
                Role: {user?.role} | Position: {user?.position}
              </p>
            </div>
            <div className='flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto'>
              <button
                onClick={handleCreateReport}
                className='w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              >
                Create Report
              </button>
              <button
                onClick={handleLogout}
                className='w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
        {/* Section Heading */}
        <div className='mb-6'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0'>
            <div>
              <h2 className='text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2'>
                My Reports
              </h2>
              <p className='text-gray-600'>
                View all your submitted reports here.
              </p>
            </div>
            <button
              onClick={fetchReports}
              className='px-3 py-2 text-sm bg-gray-100 text-gray-700 border-primary-orange border rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Reports Display */}
        <div className='bg-white rounded-lg shadow-sm border overflow-x-auto'>
          {loading ? (
            <div className='flex justify-center items-center py-12'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
              <span className='ml-3 text-gray-600'>
                Loading reports...
              </span>
            </div>
          ) : error ? (
            <div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
              <div className='text-red-500 mb-4'>
                <svg
                  className='w-12 h-12'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <p className='text-gray-600 mb-4'>{error}</p>
              <button
                onClick={fetchReports}
                className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
              >
                Try Again
              </button>
            </div>
          ) : reports.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
              <div className='text-gray-400 mb-4'>
                <svg
                  className='w-12 h-12'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
              </div>
              <p className='text-gray-600 mb-4'>No reports found</p>
              <button
                onClick={handleCreateReport}
                className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
              >
                Create Your First Report
              </button>
            </div>
          ) : (
            <div className='w-full overflow-x-auto'>
              <ReportsTable reports={reports} />
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <CreateReportModal
        isOpen={isCreateModalOpen}
        onClose={handleModalClose}
        onReportCreated={handleReportCreated}
      />
    </div>
  );
};

export default Home;
