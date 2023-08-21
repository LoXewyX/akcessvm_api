import express from 'express';
import { handleLogout } from '../../controllers/logout.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Handles user logout and clears refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully logged out.
 *       204:
 *         description: No refresh token found, nothing to do.
 *       404:
 *         description: User not found. Refresh token might have been invalidated or user doesn't exist.
 *       500:
 *         description: Internal server error during logout process.
 */
router.get('/', handleLogout);

export default router;