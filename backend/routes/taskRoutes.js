const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
} = require("../controllers/taskController");
const { protect } = require("../middleware/auth");

// Validation rules
const taskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Invalid status"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),
];

// All routes are protected
router.use(protect);

// Task statistics
router.get("/stats", getTaskStats);

// CRUD routes
router.route("/").get(getTasks).post(taskValidation, createTask);

router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;
