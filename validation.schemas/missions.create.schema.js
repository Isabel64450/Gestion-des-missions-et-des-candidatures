import Joi from 'joi';

const createMissionSchema = Joi.object({
  title: Joi.string()
    .min(5)
    .max(255)
    .required()
    .messages({
      'string.empty': 'Le titre est requis.',
      'string.min': 'Le titre doit contenir au moins 5 caractères.',
      'string.max': 'Le titre ne peut pas dépasser 255 caractères.'
    }),

  description: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.empty': 'La description est requise.',
      'string.min': 'La description doit contenir au moins 10 caractères.',
      'string.max': 'La description ne peut pas dépasser 1000 caractères.'
    }),

  date: Joi.date()
    .iso()
    .greater('now')
    .required()
    .messages({
      'date.base': 'La date doit être au format valide (YYYY-MM-DD).',
      'date.greater': 'La date doit être postérieure à aujourd’hui.',
      'any.required': 'La date est requise.'
    })
});

export default createMissionSchema;