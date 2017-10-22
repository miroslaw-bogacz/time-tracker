export function toPayload<P>(action: { type: string, payload?: P }) {
  try {
    return action.payload;
  } catch (err) {
    console.error('Error extracting payload from action:', err);
  }
}
