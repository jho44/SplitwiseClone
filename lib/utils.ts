export const preventLosingInputFocus = (
  e: React.FocusEvent<HTMLInputElement, Element>,
) => {
  if (!e.relatedTarget) {
    e.target.focus();
  }
};
