export const preventLosingInputFocus = (
  e: React.FocusEvent<HTMLInputElement, Element>,
) => {
  if (!e.relatedTarget) {
    e.target.focus();
  }
};

export const toTwoDecimalPts = (amtPaid: number) =>
  parseFloat((Math.round(amtPaid * 100) / 100).toFixed(2));
