import Joi from "joi";

export const schema = Joi.object({
  name: Joi.string().required().max(30).messages({
    "string.empty": "Nome é obrigatório",
    "string.max": "O nome deve ser preenchido até 30 caracteres",
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "E-mail é obrigatório",
      "string.email": "E-mail inválido",
    }),
  message: Joi.string().min(12).max(256).messages({
    "string.empty": "A mensagem deve ser preenchida com no mínimo 12 caracteres",
    "string.min": "A mensagem deve ser preenchida com no mínimo 12 caracteres",
    "string.max": "A mensagem deve ser preenchida até 256 caracteres",
  }),
  phoneNumber: Joi.string()
    .allow("")
    .pattern(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/)
    .messages({
      "string.pattern.base": "Telefone inválido",
    }),
});
