const Sequelize = require('sequelize');
const crypto = require('crypto');
const db = require('../db');

const User = db.define('user', {
  facebookId: {
    type: Sequelize.STRING,
    allowNull: true
  },

  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },

  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password');
    },
    allowNull: false
  },

  username: {
    type: Sequelize.STRING,
    unique: true
  },

  photo: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'https://i.imgur.com/34jE5RS.png'
  },

  location: {
    type: Sequelize.INTEGER, //Zip code?
    allowNull: true
  },

  gender: {
    type: Sequelize.ENUM('male', 'female', 'other'),
    allowNull: true
  },

  age: {
    type: Sequelize.INTEGER,
    allowNull: true
  },

  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  isOnboarded: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt');
    }
  }
});

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate(User => {
  User.forEach(setSaltAndPassword);
});

module.exports = User;
