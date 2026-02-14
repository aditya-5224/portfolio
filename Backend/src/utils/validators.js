const Joi = require('joi');

// Project validation schema
const projectValidationSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(10).max(2000).required(),
  technologies: Joi.array().items(Joi.string()).default([]),
  link: Joi.string().uri().optional().allow(null, ''),
  imageUrl: Joi.string().uri().optional().allow(null, ''),
  startDate: Joi.date().optional().allow(null),
  endDate: Joi.date().optional().allow(null),
  featured: Joi.boolean().default(false)
}).unknown(false);

// Certification validation schema
const certificationValidationSchema = Joi.object({
  name: Joi.string().min(3).max(200).required(),
  issuer: Joi.string().min(2).max(200).required(),
  dateObtained: Joi.alternatives().try(Joi.date(), Joi.allow(null, '')),
  credentialId: Joi.string().optional().allow(null, ''),
  credentialUrl: Joi.string().uri().optional().allow(null, ''),
  link: Joi.string().uri().optional().allow(null, ''),
  expiryDate: Joi.date().optional().allow(null)
}).unknown(false);

// Achievement validation schema
const achievementValidationSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(10).max(2000).optional().allow(null, ''),
  date: Joi.date().optional().allow(null, ''),
  category: Joi.string().valid('awards', 'publications', 'recognition', 'other').default('other'),
  imageUrl: Joi.string().uri().optional().allow(null, ''),
  link: Joi.string().uri().optional().allow(null, '')
}).unknown(false);

// Validation helper
const validate = (data, schema) => {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    const details = error.details.map(e => ({
      field: e.path.join('.'),
      message: e.message
    }));
    return { valid: false, details };
  }
  return { valid: true, data: value };
};

module.exports = {
  projectValidationSchema,
  certificationValidationSchema,
  achievementValidationSchema,
  validate
};
