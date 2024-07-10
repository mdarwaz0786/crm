// test controller
export const testController = async (req, res) => {
  return res.status(200).json({success: true, message: "server is successfully running"});
};