import React from "react";
import { FiEdit2, FiTrash2, FiCalendar, FiClock } from "react-icons/fi";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
    completed: "bg-green-100 text-green-800 border-green-200",
  };

  const priorityColors = {
    low: "bg-gray-100 text-gray-800 border-gray-200",
    medium: "bg-orange-100 text-orange-800 border-orange-200",
    high: "bg-red-100 text-red-800 border-red-200",
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && task.status !== "completed";
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {task.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            <span
              className={`px-2 py-1 rounded-md text-xs font-medium border ${
                statusColors[task.status]
              }`}
            >
              {task.status.replace("-", " ")}
            </span>
            <span
              className={`px-2 py-1 rounded-md text-xs font-medium border ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {task.description}
        </p>
      )}

      {/* Dates */}
      <div className="space-y-2 mb-4 text-sm text-gray-500">
        {task.dueDate && (
          <div className="flex items-center space-x-2">
            <FiCalendar
              className={isOverdue(task.dueDate) ? "text-red-500" : ""}
            />
            <span
              className={
                isOverdue(task.dueDate) ? "text-red-500 font-medium" : ""
              }
            >
              Due: {formatDate(task.dueDate)}
              {isOverdue(task.dueDate) && " (Overdue)"}
            </span>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <FiClock />
          <span>Created: {formatDate(task.createdAt)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 btn btn-secondary flex items-center justify-center space-x-2"
        >
          <FiEdit2 />
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="flex-1 btn btn-danger flex items-center justify-center space-x-2"
        >
          <FiTrash2 />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
