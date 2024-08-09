This is a CRM Web Application build using MERN STACK.

import checkFieldUpdatePermission from "../middlewares/checkFieldUpdatePermission.js";

app.put('/api/v1/customer/update-customer/:id', checkFieldUpdatePermission('customer', ['name', 'email', 'phone', 'address']), (req, res) => {
  // Your update logic here
});
