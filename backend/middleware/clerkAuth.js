const { clerkMiddleware, getAuth, clerkClient } = require('@clerk/express');

// Protect API routes - returns 401 JSON (no redirect)
const protectClerk = async (req, res, next) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Please sign in.'
    });
  }
  try {
    const user = await clerkClient.users.getUser(userId);
    req.user = {
      id: userId,
      _id: userId,
      role: user.publicMetadata?.role || 'student'
    };
    next();
  } catch (err) {
    req.user = { id: userId, _id: userId, role: 'student' };
    next();
  }
};

module.exports = { clerkMiddleware, getAuth, protectClerk };
