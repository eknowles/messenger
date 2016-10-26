const Model = require('../../lib/facade');
const fb = require('../../lib/facebook');
const userSchema = require('./user-schema');

class UserModel extends Model {

  /**
   * Create a user from a facebook ID
   * @param facebookUserId
   * @returns {Promise.<TResult>|Promise|*}
   */
  createBasic(facebookUserId) {
    return fb.getUser(facebookUserId)
      .then(u => JSON.parse(u))
      .then(u => {
        return this.create({
          facebookId: facebookUserId,
          firstName: u.first_name,
          lastName: u.last_name,
          avatar: u.profile_pic,
          timezone: u.timezone,
          gender: u.gender,
          locale: u.locale
        });
      });
  }

}

module.exports = new UserModel(userSchema);
