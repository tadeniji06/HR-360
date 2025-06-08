import React, { useState } from "react";
import { createReport } from "../functions/reportFunctions";

const CreateReportModal = ({ isOpen, onClose, onReportCreated }) => {
  const [formData, setFormData] = useState({
    brand: "",
    deliverables: [{ title: "", description: "", status: "Completed" }],
    nextWeekTargets: [
      { title: "", description: "", dueDate: "", priority: "Medium" },
    ],
    additionalNotes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const resetForm = () => {
    setFormData({
      brand: "",
      deliverables: [{ title: "", description: "", status: "Completed" }],
      nextWeekTargets: [
        { title: "", description: "", dueDate: "", priority: "Medium" },
      ],
      additionalNotes: "",
    });
    setSubmitStatus(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle deliverables changes
  const handleDeliverableChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      deliverables: prev.deliverables.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Handle next week targets changes
  const handleTargetChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      nextWeekTargets: prev.nextWeekTargets.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Add new deliverable
  const addDeliverable = () => {
    setFormData((prev) => ({
      ...prev,
      deliverables: [
        ...prev.deliverables,
        { title: "", description: "", status: "Completed" },
      ],
    }));
  };

  // Remove deliverable
  const removeDeliverable = (index) => {
    if (formData.deliverables.length > 1) {
      setFormData((prev) => ({
        ...prev,
        deliverables: prev.deliverables.filter((_, i) => i !== index),
      }));
    }
  };

  // Add new target
  const addTarget = () => {
    setFormData((prev) => ({
      ...prev,
      nextWeekTargets: [
        ...prev.nextWeekTargets,
        { title: "", description: "", dueDate: "", priority: "Medium" },
      ],
    }));
  };

  // Remove target
  const removeTarget = (index) => {
    if (formData.nextWeekTargets.length > 1) {
      setFormData((prev) => ({
        ...prev,
        nextWeekTargets: prev.nextWeekTargets.filter(
          (_, i) => i !== index
        ),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Format data for API
      const reportData = {
        brand: formData.brand.trim(),
        deliverables: formData.deliverables.filter((d) => d.title.trim()),
        nextWeekTargets: formData.nextWeekTargets
          .filter((t) => t.title.trim())
          .map((target) => ({
            ...target,
            dueDate: target.dueDate
              ? new Date(target.dueDate).toISOString()
              : null,
          })),
        additionalNotes: formData.additionalNotes.trim() || null,
      };

      const response = await createReport(reportData);
      setSubmitStatus({
        type: "success",
        message: "Report created successfully!",
      });

      // Reset form and close modal after successful submission
      setTimeout(() => {
        resetForm();
        onReportCreated();
      }, 1500);

      console.log("Report created:", response);
    } catch (error) {
      console.error("Error creating report:", error);
      const errorMessage = error.response?.data?.details
        ? error.response.data.details.map((d) => d.msg).join(", ")
        : error.response?.data?.error ||
          "Failed to create report. Please try again.";

      setSubmitStatus({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.brand.trim() &&
    formData.deliverables.some((d) => d.title.trim()) &&
    formData.nextWeekTargets.some((t) => t.title.trim());

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Modal Header */}
        <div className='flex justify-between items-center p-6 border-b border-gray-200'>
          <h2 className='text-2xl font-bold text-gray-800'>
            Create New Report
          </h2>
          <button
            onClick={handleClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className='p-6'>
          {submitStatus && (
            <div
              className={`mb-4 p-4 rounded-md ${
                submitStatus.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Brand Field */}
            <div>
              <label
                htmlFor='brand'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Brand *
              </label>
              <input
                type='text'
                id='brand'
                name='brand'
                value={formData.brand}
                onChange={handleInputChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Enter brand name'
              />
            </div>

            {/* Deliverables Section */}
            <div>
              <div className='flex justify-between items-center mb-4'>
                <label className='block text-sm font-medium text-gray-700'>
                  Deliverables *
                </label>
                <button
                  type='button'
                  onClick={addDeliverable}
                  className='px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  Add Deliverable
                </button>
              </div>

              {formData.deliverables.map((deliverable, index) => (
                <div
                  key={index}
                  className='mb-4 p-4 border border-gray-200 rounded-md bg-gray-50'
                >
                  <div className='flex justify-between items-center mb-3'>
                    <h4 className='text-sm font-medium text-gray-700'>
                      Deliverable {index + 1}
                    </h4>
                    {formData.deliverables.length > 1 && (
                      <button
                        type='button'
                        onClick={() => removeDeliverable(index)}
                        className='text-red-600 hover:text-red-800 text-sm'
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-xs font-medium text-gray-600 mb-1'>
                        Title *
                      </label>
                      <input
                        type='text'
                        value={deliverable.title}
                        onChange={(e) =>
                          handleDeliverableChange(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                        placeholder='Deliverable title'
                      />
                    </div>

                    <div>
                      <label className='block text-xs font-medium text-gray-600 mb-1'>
                        Status
                      </label>
                      <select
                        value={deliverable.status}
                        onChange={(e) =>
                          handleDeliverableChange(
                            index,
                            "status",
                            e.target.value
                          )
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                      >
                        <option value='Completed'>Completed</option>
                        <option value='In Progress'>In Progress</option>
                        <option value='Pending'>Pending</option>
                        <option value='Cancelled'>Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className='mt-3'>
                    <label className='block text-xs font-medium text-gray-600 mb-1'>
                      Description
                    </label>
                    <textarea
                      value={deliverable.description}
                      onChange={(e) =>
                        handleDeliverableChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      rows={2}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                      placeholder='Describe the deliverable...'
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Next Week Targets Section */}
            <div>
              <div className='flex justify-between items-center mb-4'>
                <label className='block text-sm font-medium text-gray-700'>
                  Next Week Targets *
                </label>
                <button
                  type='button'
                  onClick={addTarget}
                  className='px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
                >
                  Add Target
                </button>
              </div>

              {formData.nextWeekTargets.map((target, index) => (
                <div
                  key={index}
                  className='mb-4 p-4 border border-gray-200 rounded-md bg-gray-50'
                >
                  <div className='flex justify-between items-center mb-3'>
                    <h4 className='text-sm font-medium text-gray-700'>
                      Target {index + 1}
                    </h4>
                    {formData.nextWeekTargets.length > 1 && (
                      <button
                        type='button'
                        onClick={() => removeTarget(index)}
                        className='text-red-600 hover:text-red-800 text-sm'
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div>
                      <label className='block text-xs font-medium text-gray-600 mb-1'>
                        Title *
                      </label>
                      <input
                        type='text'
                        value={target.title}
                        onChange={(e) =>
                          handleTargetChange(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                        placeholder='Target title'
                      />
                    </div>

                    <div>
                      <label className='block text-xs font-medium text-gray-600 mb-1'>
                        Due Date
                      </label>
                      <input
                        type='datetime-local'
                        value={target.dueDate}
                        onChange={(e) =>
                          handleTargetChange(
                            index,
                            "dueDate",
                            e.target.value
                          )
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                      />
                    </div>

                    <div>
                      <label className='block text-xs font-medium text-gray-600 mb-1'>
                        Priority
                      </label>
                      <select
                        value={target.priority}
                        onChange={(e) =>
                          handleTargetChange(
                            index,
                            "priority",
                            e.target.value
                          )
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                      >
                        <option value='Low'>Low</option>
                        <option value='Medium'>Medium</option>
                        <option value='High'>High</option>
                        <option value='Critical'>Critical</option>
                      </select>
                    </div>
                  </div>

                  <div className='mt-3'>
                    <label className='block text-xs font-medium text-gray-600 mb-1'>
                      Description
                    </label>
                    <textarea
                      value={target.description}
                      onChange={(e) =>
                        handleTargetChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      rows={2}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                      placeholder='Describe the target...'
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Notes Field */}
            <div>
              <label
                htmlFor='additionalNotes'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Additional Notes
              </label>
              <textarea
                id='additionalNotes'
                name='additionalNotes'
                value={formData.additionalNotes}
                onChange={handleInputChange}
                rows={3}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Any additional notes or observations...'
              />
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className='flex justify-end space-x-3 p-6 border-t border-gray-200'>
          <button
            type='button'
            onClick={handleClose}
            className='px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
          >
            Cancel
          </button>
          <button
            type='submit'
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              isFormValid && !isSubmitting
                ? "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Creating Report..." : "Create Report"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateReportModal;
