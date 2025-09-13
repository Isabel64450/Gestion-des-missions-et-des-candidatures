import Joi from 'joi';

 const registerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Le nom est requis.',
      'string.min': 'Le nom doit contenir au moins 2 caractères.',
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Email invalide.',
      'string.empty': 'Email requis.',
    }),

  password: Joi.string()
    .min(8)
    .max(50)
    .required()
    .messages({
      'string.min': 'Le mot de passe doit contenir au moins 8 caractères.',
      'string.empty': 'Mot de passe requis.',
    }),

  role: Joi.string()
    .valid('benevole', 'association')
    .required()
    .messages({
      'any.only': 'Le rôle doit être "benevole" ou "association".',
      'string.empty': 'Le rôle est requis.',
    })
});

export default registerSchema