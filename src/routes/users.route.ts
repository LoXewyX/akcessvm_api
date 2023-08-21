import express from "express";
import {
  getUser,
  getAuthenticatedUserData,
  updateAuthenticatedUserData,
  deleteAuthenticatedUser,
  getAllUsers,
  deleteUser,
  getIds,
} from "../controllers/users.controller";
import { ROLES } from "../model/user.model";
import verifyRoles from "../middlewares/verifyRoles.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Admin access required)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       500:
 *         description: Internal server error during user retrieval
 *   delete:
 *     summary: Delete a user (Admin access required)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User ID to be deleted
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       400:
 *         description: Bad request - Missing user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error during user deletion
 */
router.route("/").get(verifyRoles(ROLES.Admin), getAllUsers)
  .delete(verifyRoles(ROLES.Admin), deleteUser);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID (Admin access required)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *       400:
 *         description: Bad request - Missing user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error during user retrieval
 */
router.route("/:id").get(verifyRoles(ROLES.Admin), getUser);

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get authenticated user's data
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user's data
 *       401:
 *         description: Unauthorized - Invalid token
 *       403:
 *         description: Forbidden - Access denied
 *       500:
 *         description: Internal server error during data retrieval
 *   post:
 *     summary: Update authenticated user's data
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user's data updated
 *       401:
 *         description: Unauthorized - Invalid token
 *       403:
 *         description: Forbidden - Access denied
 *       500:
 *         description: Internal server error during data update
 *   delete:
 *     summary: Delete authenticated user (Admin access required)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user successfully deleted
 *       401:
 *         description: Unauthorized - Invalid token
 *       403:
 *         description: Forbidden - Access denied
 *       500:
 *         description: Internal server error during user deletion
 */
router.route("/me").get(verifyRoles(ROLES.User), getAuthenticatedUserData)
  .post(verifyRoles(ROLES.User), updateAuthenticatedUserData)
  .delete(verifyRoles(ROLES.User), deleteAuthenticatedUser);

/**
 * @swagger
 * /api/users/id:
 *   get:
 *     summary: Get IDs of all users (User access required)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user IDs
 *       401:
 *         description: Unauthorized - Invalid token
 *       403:
 *         description: Forbidden - Access denied
 *       500:
 *         description: Internal server error during user ID retrieval
 */
router.route("/id").get(verifyRoles(ROLES.User), getIds);

export default router;
