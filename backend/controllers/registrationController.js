const Registration = require('../models/Registration');
const User = require('../models/User');
const Event = require('../models/Event');
const Team = require('../models/Team');
const { validateRegistration } = require('../utils/validateInput');

exports.registerUser = async (req, res, next) => {
  try {
    const { error } = validateRegistration(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, college, phone, eventId, teamName } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, college, phone });
      await user.save();
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    let team = null;
    if (teamName) {
      team = await Team.findOne({ name: teamName, event: eventId });
      if (!team) {
        team = new Team({
          name: teamName,
          event: eventId,
          members: [user._id],
        });
        await team.save();
      } else {
        team.members.push(user._id);
        await team.save();
      }
    }

    const registration = new Registration({
      user: user._id,
      event: eventId,
      team: team ? team._id : null,
    });

    await registration.save();
    res.status(201).json(registration);
  } catch (error) {
    next(error);
  }
};