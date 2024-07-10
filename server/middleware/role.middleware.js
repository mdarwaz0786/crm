const checkPermission = (master, action) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (userRole && userRole.permissions && userRole.permissions[master] && userRole.permissions[master].access && userRole.permissions[master][action]) {
      next();
    } else {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
  };
};

export default checkPermission;
