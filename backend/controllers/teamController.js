const Team = require('../models/Team');
const Registration = require('../models/Registration');
const { validateTeam } = require('../utils/validateInput');

exports.createTeam = async (req, res, next) => {
  try {
    const { error } = validateTeam(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, eventId, memberIds } = req.body;

    const team = new Team({
      name,
      event: eventId,
      members: memberIds,
    });

    await team.save();

    await Registration.updateMany(
      { user: { $in: memberIds }, event: eventId },
      { team: team._id }
    );

    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
};

