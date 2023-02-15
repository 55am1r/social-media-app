const Users = require("../../Models/User");
const { error, success } = require("../../Utilities/StatusMessages");

module.exports = async (req, res) => {
  try {
    const { _id } = req.body;
    const userIdToSearch = req.body.userId;
    if (userIdToSearch === "") {
      return res.send(success(200, "Not Valid Search"));
    }
    const users = await Users.find(
      {
        username: {
          $regex: new RegExp("^" + userIdToSearch, "i"),
        },
        _id: { $nin: _id },
      },
      { username: 1, _id: 1 }
    );
    return res.send(
      success(200, users.length > 0 ? users : "Not Found Anyone")
    );
  } catch (e) {
    console.log(e);
    res.send(error(500, e.message));
  }
};
