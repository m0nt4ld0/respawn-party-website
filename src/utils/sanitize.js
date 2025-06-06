
export function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input.replace(/[<>"'`&]/g, '');
  }
  