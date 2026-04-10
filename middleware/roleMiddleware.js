// middlewares/roleMiddleware.js

const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      
    }

    // Get role name
    const roleName =
      typeof req.user.role === "object"
        ? req.user.role.name
        : req.user.role;
      
    // Check if role is allowed
    if (!allowedRoles.map(r => r.toLowerCase()).includes(roleName.toLowerCase())) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    next();
  };
};

module.exports = roleMiddleware;