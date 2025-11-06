import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TaskModal from "../components/TaskModal";
import TaskCard from "../components/TaskCard";
import StatsCard from "../components/StatsCard";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
} from "../services/taskService";
import { toast } from "react-toastify";
import { FiPlus, FiSearch, FiFilter } from "react-icons/fi";
import {
  MdPendingActions,
  MdPlayArrow,
  MdCheckCircle,
  MdTaskAlt,
} from "react-icons/md";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    search: "",
    sort: "newest",
  });

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks(filters);
      setTasks(data.tasks);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getTaskStats();
      setStats(data.stats);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
      toast.success("Task created successfully!");
      fetchTasks();
      fetchStats();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message || "Failed to create task");
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await updateTask(editingTask._id, taskData);
      toast.success("Task updated successfully!");
      fetchTasks();
      fetchStats();
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      toast.error(error.message || "Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
        toast.success("Task deleted successfully!");
        fetchTasks();
        fetchStats();
      } catch (error) {
        toast.error(error.message || "Failed to delete task");
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      priority: "",
      search: "",
      sort: "newest",
    });
  };

  const hasActiveFilters = filters.status || filters.priority || filters.search;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your tasks efficiently</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Tasks"
              value={stats.total}
              icon={<MdTaskAlt className="text-2xl" />}
              color="bg-blue-500"
            />
            <StatsCard
              title="Pending"
              value={stats.pending}
              icon={<MdPendingActions className="text-2xl" />}
              color="bg-yellow-500"
            />
            <StatsCard
              title="In Progress"
              value={stats.inProgress}
              icon={<MdPlayArrow className="text-2xl" />}
              color="bg-orange-500"
            />
            <StatsCard
              title="Completed"
              value={stats.completed}
              icon={<MdCheckCircle className="text-2xl" />}
              color="bg-green-500"
            />
          </div>
        )}

        {/* Filters and Actions */}
        <div className="card mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="input pl-10 w-full"
              />
            </div>

            {/* Filter dropdowns */}
            <div className="flex flex-wrap gap-3">
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="input py-2"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={filters.priority}
                onChange={(e) => handleFilterChange("priority", e.target.value)}
                className="input py-2"
              >
                <option value="">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange("sort", e.target.value)}
                className="input py-2"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priority">Priority</option>
                <option value="dueDate">Due Date</option>
              </select>

              {hasActiveFilters && (
                <button onClick={clearFilters} className="btn btn-secondary">
                  Clear
                </button>
              )}

              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary flex items-center space-x-2"
              >
                <FiPlus />
                <span>New Task</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="card text-center py-16">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MdTaskAlt className="text-5xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {hasActiveFilters ? "No tasks found" : "No tasks yet"}
              </h3>
              <p className="text-gray-600 mb-6">
                {hasActiveFilters
                  ? "Try adjusting your filters"
                  : "Get started by creating your first task"}
              </p>
              {!hasActiveFilters && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <FiPlus />
                  <span>Create Task</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          task={editingTask}
        />
      )}
    </div>
  );
};

export default Dashboard;
