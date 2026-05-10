export function formatCardNumber(raw?: string): string {
  if (!raw) return '';
  const digits = raw.replace(/\D/g, '');
  return digits.replace(/(.{4})/g, '$1 ').trim();
}


export function maskCardNumber(raw?: string): string {
  if (!raw) return '';
  const digits = raw.replace(/\D/g, '');
  if (digits.length <= 4) return digits;
  const last4 = digits.slice(-4);
  const maskedLength = digits.length - 4;
  const groups = Math.ceil(maskedLength / 4);
  const masked = Array(groups).fill('****').join(' ');
  return `${masked} ${last4}`;
}

