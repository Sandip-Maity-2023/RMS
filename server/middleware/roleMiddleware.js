/**
 * Role authorization middleware factory
 * @param  {...string} allowedRoles - Allowed roles (e.g., 'admin', 'vendor')
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Ensure authMiddleware has executed first and req.user exists
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: 'Access denied. User role not specified.' });
    }

    // Check if the user's role is included in allowedRoles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied. Requires one of the following roles: ${allowedRoles.join(', ')}` 
      });
    }

    next();
  };
};

module.exports = authorizeRoles;