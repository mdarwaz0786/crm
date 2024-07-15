import Role from "../models/role.model.js";

const checkFieldPermission = (master, fields) => {
  return async (req, res, next) => {
    try {
      const teamRole = req.team.role;
      const role = await Role.findById(teamRole._id);

      if (!role) {
        return res.status(403).json({ success: false, message: 'Access denied' });
      };

      const masterPermissions = role.permissions[master];

      if (!masterPermissions) {
        return res.status(403).json({ success: false, message: `No permissions found for ${master}` });
      };

      for (const field of fields) {
        const fieldPermission = masterPermissions.fields[field];
        if (!fieldPermission.show && !fieldPermission.read) {
          return res.status(403).json({ message: `Update access denied for field: ${field}` });
        }
      };

      next();
    } catch (error) {
      console.error('Authorization error:', error.message);
      res.status(500).json({ success: false, message: 'Internal server error' });
    };
  };
};

export default checkFieldPermission;