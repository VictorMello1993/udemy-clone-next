import { Payload } from "../components/ContactForm";
import { v4 as uuid } from "uuid";
import { schema } from "../config/schemaValidation";

export function Validate({ name, email, phoneNumber, message }: Payload) {
  const messages: { id: string; target: string; validationError: string }[] = [];

  const { error } = schema.validate({ name, email, message, phoneNumber }, { abortEarly: false });

  if (error) {
    const messagesSchemaValidation = error.details.map((item) => item);

    messagesSchemaValidation.forEach((item) => {
      messages.push({ id: uuid(), validationError: item.message, target: item.context?.key as string });
    });
  }

  return messages;
}
