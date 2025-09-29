const Joi = require('joi');

exports.validateEvent = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    date: Joi.date().iso().required(),
    description: Joi.string().min(10).required(),
  });
  return schema.validate(data);
};

exports.validateRegistration = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    college: Joi.string().min(3).optional(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),
    eventId: Joi.string().hex().length(24).required(),
    teamName: Joi.string().min(3).optional(),
  });
  return schema.validate(data);
};

exports.validateTeam = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    eventId: Joi.string().hex().length(24).required(),
    memberIds: Joi.array().items(Joi.string().hex().length(24)).min(1).required(),
  });
  return schema.validate(data);
};