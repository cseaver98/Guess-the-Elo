export function domFocused(elementId: string): boolean {
  return document.activeElement?.id === elementId;
}