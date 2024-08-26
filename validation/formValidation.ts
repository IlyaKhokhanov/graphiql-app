import * as yup from 'yup';

const Regex = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  number: /[0-9]/,
  symbol: /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/,
};

export const schema = yup.object().shape({
  email: yup.string().matches(Regex.email, 'Invalid email').required('Email is a required field'),

  password: yup
    .string()
    .required('Password is a required field')
    .test('password-complexity', function (value: string = ''): true | yup.ValidationError {
      const errors = [];

      if (!Regex.lowercase.test(value)) errors.push('One lowercase letter in latin');
      if (!Regex.uppercase.test(value)) errors.push('One capital letter in latin');
      if (!Regex.number.test(value)) errors.push('One digit');
      if (!Regex.symbol.test(value)) errors.push('One special character');
      if (value.length < 8) errors.push('8 character or more');

      if (errors.length > 0) {
        return this.createError({
          message: `password complexity - ${
            5 - errors.length
          }/5: password must contain at least ${errors.join(', ')}`,
        });
      }
      return true;
    }),
});

export const schemaReset = yup.object().shape({
  email: yup.string().matches(Regex.email, 'Invalid email').required('Email is a required field'),
});
