import express from 'express';
import { handleRefreshToken } from '../../controllers/refreshToken.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @swagger
 * /api/refresh:
 *   get:
 *     summary: Refreshes the access token using a valid refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully refreshed access token.
 *         content:
 *           application/json:
 *             example:
 *               roles: ['user']
 *               accessToken: JWT_ACCESS_TOKEN
 *       401:
 *         description: Unauthorized. No refresh token found.
 *       403:
 *         description: Forbidden. Invalid refresh token or mismatched user.
 *       500:
 *         description: Internal server error during token verification.
 */
router.get('/', handleRefreshToken);

export default router;