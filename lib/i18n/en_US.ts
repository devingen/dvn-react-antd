export default {
  code: 'en_US',
  interceptors: {
    validatorEmail: {
      message: '{title} is not a valid email address.',
    },
    validatorLength: {
      messageMaxChars: '{title} must be max {max} characters long.',
      messageMaxItems: '{title} must be max {max} items long.',
      messageMinChars: '{title} must be min {min} characters long.',
      messageMinItems: '{title} must be min {min} items long.',
    },
    validatorNotEmpty: {
      message: '{title} cannot be empty.',
    },
    validatorUrl: {
      message: '{title} is not a valid URL. Be sure it starts with HTTP or HTTPS.',
    }
  },
  language: 'English',
};
