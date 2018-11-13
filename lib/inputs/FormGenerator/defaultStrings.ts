export function getStrings(language: string) {
  switch (language) {
    case 'tr':
      return stringsTr;
    case 'en':
    default:
      return stringsEn;
  }
}

export const stringsEn = {
  add: 'Add',
  cancel: 'Cancel',
  deleteConfirmationMessage: 'After deleting this question you\'ll no longer see the already given answers for this question. Are you sure to delete this question?',
  deleteConfirmationTitle: 'This action cannot be undone!',
  field: {
    description: 'Description',
    descriptionPlaceholder: 'Description text shown below the question.',
    preview: 'Preview',
    question: 'Question',
    questionPlaceholder: 'Question',
    questionSettings: 'Question Settings',
    ratingStars: {
      starCount: 'Star count',
    },
    required: 'Required',
    requiredDescription: 'Require this field.',
    singleChoice: {
      inputType: 'Input type',
      inputTypeRadioButton: 'Radio Buttons',
      inputTypeSelect: 'Select From List',
      label: 'Option label',
      options: 'Options',
      placeholder: 'Placeholder',
      placeholderPlaceholder: 'Placeholder text is shown if the input type is \'Select\'',
      value: 'Value',
      valueDescription: 'Value is used for statistical calculations if it is a numeric value. Leave empty otherwise.',
    },
    textField: {
      lineCount: 'Line count',
      maxLineCount: 'Max line count',
      placeholder: 'Placeholder',
      placeholderPlaceholder: 'Placeholder text is shown like this text',
    },
  },
  no: 'No',
  noQuestionInForm: 'There is no question in form',
  ratingStars: 'Rating Stars',
  save: 'Save',
  singleChoice: 'Single Choice',
  textField: 'Text Field',
  textValidationError: '|label| must be min |min|, max |max| characters long.',
  yes: 'Yes',
};

export const stringsTr = {
  add: 'Ekle',
  cancel: 'İptal',
  deleteConfirmationMessage: 'Bu soruyu sildikten sonra şu ana kadar bu soru için verilen cevapları bir daha göremeyeceksiniz. Soruyu silmek istediğinize emin misiniz?',
  deleteConfirmationTitle: 'Bu eylem geri alınamaz!',
  field: {
    description: 'Açıklama',
    descriptionPlaceholder: 'Sorunun altında görünen açıklama yazısı.',
    preview: 'Önizleme',
    question: 'Soru',
    questionPlaceholder: 'Soru',
    questionSettings: 'Soru Ayarları',
    ratingStars: {
      starCount: 'Yıldız sayısı',
    },
    required: 'Zorunlu',
    requiredDescription: 'Bu alan zorunlu olsun.',
    singleChoice: {
      inputType: 'Giriş türü',
      inputTypeRadioButton: 'Radyo Düğmesi',
      inputTypeSelect: 'Listeden Seçme',
      label: 'Seçenek yazısı',
      options: 'Seçenekler',
      placeholder: 'Boş yazı',
      placeholderPlaceholder: 'Boşken görünecek yazı sadece \'Listeden Seçme\' için kullanılır',
      value: 'Değer',
      valueDescription: 'Değer, sayısal olduğu zaman istatistikler için kullanılır. Sayısal bir değer olmayacaksa boş bırakın.',
    },
    textField: {
      lineCount: 'Satır sayısı',
      maxLineCount: 'Azami satır sayısı',
      placeholder: 'Boş yazı',
      placeholderPlaceholder: 'Boşken görünecek yazı bu yazı gibi görünür',
    },
  },
  no: 'Hayır',
  noQuestionInForm: 'Formda soru yok',
  ratingStars: 'Oylama',
  save: 'Kaydet',
  singleChoice: 'Tek Seçim',
  textField: 'Yazı Alanı',
  textValidationError: '|label| en az  |min|, en fazla |max| harf içermelidir.',
  yes: 'Evet',
};
