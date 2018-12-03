export default {
  code: 'tr_TR',
  interceptors: {
    validatorEmail: {
      message: '{title} doğru bir e-posta adresi değil.',
    },
    validatorLength: {
      messageMaxChars: '{title} en fazla {max} harf içermelidir.',
      messageMaxItems: '{title} en fazla {max} tane olmalıdır.',
      messageMinChars: '{title} en az {min} harf içermelidir.',
      messageMinItems: '{title} en az {min} tane olmalıdır.',
    },
    validatorNotEmpty: {
      message: '{title} boş olamaz.',
    },
    validatorUrl: {
      message: '{title} doğru bir site adresi değil. Başında HTTP veya HTTPS olduğundan emin olun.',
    }
  },
  language: 'Türkçe',
};
