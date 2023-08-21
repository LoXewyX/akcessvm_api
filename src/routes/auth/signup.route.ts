import express from 'express';
import { handleNewUser } from '../../controllers/signup.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and registration
 */

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Registers a new user
 *     tags: [Auth]
 *     requestBody:
 *       description: New user details for registration
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             example:
 *               success: "User username created!"
 *       400:
 *         description: Bad request - Missing required fields
 *       409:
 *         description: Conflict - User already exists
 *       500:
 *         description: Internal server error during user creation
 */
router.post('/', handleNewUser);

export default router;