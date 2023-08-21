import express from 'express';
import { handleLogin } from '../../controllers/login.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Handles user login and provides JWTs
 *     tags: [Auth]
 *     requestBody:
 *       description: User credentials for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: Username of the user.
 *               pwd:
 *                 type: string
 *                 description: Password of the user.
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               roles: ['user']
 *               accessToken: JWT_ACCESS_TOKEN
 *       400:
 *         description: Bad request - Missing user or pwd
 *       401:
 *         description: Unauthorized - Invalid credentials
 */
router.post('/', handleLogin);

export default router;