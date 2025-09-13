import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string()
    .email() 
    .required()
    .messages({
      'string.email': 'Adresse email invalide.',
      'string.empty': 'L’adresse email est requise.',
    }),

  password: Joi.string()
    .min(8)
    .required()
    .messages({
      'string.min': 'Le mot de passe doit contenir au moins 8 caractères.',
      'string.empty': 'Le mot de passe est requis.',
    })
});

export default loginSchema;