const blockedTerms = ['spam', 'scam', 'fraud', 'abuse'];

export function hasBlockedTerm(input: string) {
  const lower = input.toLowerCase();
  return blockedTerms.some((term) => lower.includes(term));
}

export function validateTitle(title: string) {
  if (!title || title.trim().length < 5) return 'Title must be at least 5 characters.';
  if (title.length > 140) return 'Title must be 140 characters or less.';
  if (hasBlockedTerm(title)) return 'Title contains blocked language.';
  return null;
}

export function validateBody(text: string) {
  if (!text || text.trim().length < 10) return 'Message must be at least 10 characters.';
  if (text.length > 2000) return 'Message must be 2000 characters or less.';
  if (hasBlockedTerm(text)) return 'Message contains blocked language.';
  return null;
}
