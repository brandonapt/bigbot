module.exports = async (client) => {
  const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '.data/db.sqlite',
    logging: false
});

const groups = sequelize.define('groups', {
    cookie: Sequelize.STRING,
    groupId: Sequelize.INTEGER,
    serverId: Sequelize.STRING
});
groups.sync();
client.groups = groups;
}