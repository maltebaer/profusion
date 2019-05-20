function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) next();
  else next({ status: 403, message: "Unauthorized" });
}

function isUserRole(roles = []) {
  return function(req, res, next) {
    if (req.isAuthenticated() && roles.includes(req.user.role)) next();
    else next({ status: 403, message: "Unauthorized" });
  };
}

module.exports = {
  isLoggedIn,
  isUserRole
};
