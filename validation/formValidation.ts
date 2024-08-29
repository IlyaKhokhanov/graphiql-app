import * as yup from 'yup';

import { IntlMessages } from '@/containers/types';

const Regex = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  number: /[0-9]/,
  symbol: /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/,
};

export const schemaIntl = ({ messages }: IntlMessages) => {
  return yup.object().shape({
    email: yup
      .string()
      .matches(Regex.email, messages['yup.email.invalid'])
      .required(messages['yup.email.required']),

    password: yup
      .string()
      .required(messages['yup.password.required'])
      .test('password-complexity', function (value: string = ''): true | yup.ValidationError {
        const errors = [];

        if (!Regex.lowercase.test(value)) errors.push(messages['yup.password.onelowercase']);
        if (!Regex.uppercase.test(value)) errors.push(messages['yup.password.onecapital']);
        if (!Regex.number.test(value)) errors.push(messages['yup.password.onedigit']);
        if (!Regex.symbol.test(value)) errors.push(messages['yup.password.onespecial']);
        if (value.length < 8) errors.push(messages['yup.password.minlength']);

        if (errors.length > 0) {
          return this.createError({
            message: `${messages['yup.password.complexity']} - ${
              5 - errors.length
            }/5: ${messages['yup.password.mustcontain']} ${errors.join(', ')}`,
          });
        }
        return true;
      }),
  });
};

export const schemaResetIntl = ({ messages }: IntlMessages) => {
  return yup.object().shape({
    email: yup
      .string()
      .matches(Regex.email, messages['yup.email.invalid'])
      .required(messages['yup.email.required']),
  });
};
