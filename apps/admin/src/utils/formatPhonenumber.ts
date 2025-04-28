export const formatPhoneNumber = (input: string) => {
  const digits = input.replace(/\D/g, '');

  const match = digits.match(/^(0\d{1,2})(\d{3,4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }

  return digits;
};

export default formatPhoneNumber;
