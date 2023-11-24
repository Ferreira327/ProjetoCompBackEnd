export default (req, res, next) => {
  if (req.enf_admin) {
    return next();
  }
  return res.status(401).send({ error: "User is not admin" });
};
