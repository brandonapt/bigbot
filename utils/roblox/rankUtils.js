const roblox = require("noblox.js");
module.exports = {
  getRankName: async (func_group, func_user) => {
    let rolename = await roblox.getRankNameInGroup(func_group, func_user);
    return rolename;
  },

  getRankID: async (func_group, func_user) => {
    let role = await roblox.getRankInGroup(func_group, func_user);
    return role;
  },

  getRankFromName: async (func_rankname, func_group) => {
    let roles = await roblox.getRoles(func_group);
    let role = await roles.find(rank => rank.name.toLowerCase() == func_rankname.toLowerCase());
    if (!role) {
        return 'NOT_FOUND';
    }
    return role.rank;
  }
}