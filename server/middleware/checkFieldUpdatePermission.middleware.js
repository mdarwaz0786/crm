import Role from "../models/role.model.js";

const checkFieldUpdatePermission = (master, fields) => {
  return async (req, res, next) => {
    try {
      const teamRole = req.team.role;
      const role = await Role.findById(teamRole._id);

      if (!role) {
        return res.status(403).json({ success: false, message: 'Access denied' });
      };

      const masterPermissions = role.permissions[master];

      if (!masterPermissions) {
        return res.status(403).json({ success: false, message: `No permission found for ${master}` });
      };

      for (const field of fields) {
        const fieldPermissions = masterPermissions.fields[field];
        if (!fieldPermissions) {
          return res.status(403).json({ success: false, message: `No field permissions found for ${field}` });
        };

        if (fieldPermissions.read === false && fieldPermissions.show === true) {
          continue;
        } else {
          return res.status(403).json({ success: false, message: `Update permission denied for field ${field}` });
        };
      };

      next();
    } catch (error) {
      console.error('Authorization error:', error.message);
      res.status(500).json({ success: false, message: `Authorization error: ${error.message}` });
    };
  };
};

export default checkFieldUpdatePermission;
