/**
 * Fault-tolerant Fuzzy Search implementation for Punto Nexus
 * Specifically supports typo-tolerance (e.g. "prgramacion" -> "programación")
 */

export function normalizeString(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^\w\s]/gi, " ")       // Remove special chars
    .replace(/\s+/g, " ")            // Normalize spaces
    .trim();
}

/**
 * Standard Levenshtein distance between two strings
 */
export function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Common typo vocabulary mapping for rapid youth search experience
 */
const COMMON_VOCABULARY = [
  "programacion", "desarrollo", "frontend", "backend", "fullstack",
  "datos", "analista", "python", "javascript", "react", "ciberseguridad",
  "beca", "becas", "santander", "google", "cloud", "amazon", "pasantia",
  "empleo", "remoto", "hibrido", "certificacion", "curso", "diseño",
  "scrum", "maestria", "universitario", "innovacion", "gratis"
];

/**
 * Find closest matching vocabulary word for a potentially misspelled word
 */
export function findClosestWord(token, customVocab = []) {
  const normToken = normalizeString(token);
  if (!normToken || normToken.length < 3) return null;

  const allVocab = Array.from(new Set([...COMMON_VOCABULARY, ...customVocab]));
  let bestMatch = null;
  let minDistance = Infinity;

  const maxAllowedDist = normToken.length > 5 ? 2 : 1;

  for (const word of allVocab) {
    const normWord = normalizeString(word);
    if (normToken === normWord) {
      return normWord; // exact match
    }

    const dist = levenshteinDistance(normToken, normWord);
    if (dist <= maxAllowedDist && dist < minDistance) {
      minDistance = dist;
      bestMatch = word;
    }
  }

  return bestMatch;
}

/**
 * Perform predictive and typo-tolerant search across opportunities list
 */
export function fuzzySearchOpportunities(opportunities, searchQuery) {
  if (!searchQuery || !searchQuery.trim()) {
    return {
      results: opportunities,
      suggestion: null,
      hasTypos: false
    };
  }

  const rawQuery = searchQuery.trim();
  const normalizedQuery = normalizeString(rawQuery);
  const queryTokens = normalizedQuery.split(" ").filter(Boolean);

  // Build dynamic vocabulary from the opportunities
  const customVocab = [];
  opportunities.forEach(opp => {
    customVocab.push(opp.title);
    customVocab.push(opp.category);
    customVocab.push(opp.issuer.name);
    (opp.tags || []).forEach(t => customVocab.push(t));
  });

  // Check for typos and construct possible suggestion
  let hasTypos = false;
  const suggestedTokens = queryTokens.map(token => {
    const closest = findClosestWord(token, customVocab);
    if (closest && closest !== token) {
      hasTypos = true;
      return closest;
    }
    return token;
  });

  const suggestion = hasTypos ? suggestedTokens.join(" ") : null;

  // Score each opportunity
  const scored = opportunities.map(opp => {
    let score = 0;

    const normTitle = normalizeString(opp.title);
    const normIssuer = normalizeString(opp.issuer?.name);
    const normCategory = normalizeString(opp.category);
    const normTags = (opp.tags || []).map(normalizeString).join(" ");
    const normReqs = (opp.requirements || []).map(normalizeString).join(" ");
    const normDesc = normalizeString(opp.description);

    // 1. Direct exact or substring matches
    if (normTitle.includes(normalizedQuery)) score += 50;
    if (normTags.includes(normalizedQuery)) score += 30;
    if (normIssuer.includes(normalizedQuery)) score += 25;
    if (normCategory.includes(normalizedQuery)) score += 20;
    if (normReqs.includes(normalizedQuery)) score += 15;
    if (normDesc.includes(normalizedQuery)) score += 10;

    // 2. Token-by-token evaluation (with fuzzy match tolerance)
    queryTokens.forEach((token, index) => {
      const suggestedToken = suggestedTokens[index] || token;

      // Exact token substring
      if (normTitle.includes(token)) score += 20;
      else if (normTitle.includes(suggestedToken)) score += 16;

      if (normTags.includes(token)) score += 15;
      else if (normTags.includes(suggestedToken)) score += 12;

      if (normIssuer.includes(token)) score += 10;
      else if (normIssuer.includes(suggestedToken)) score += 8;

      if (normReqs.includes(token)) score += 8;
      else if (normReqs.includes(suggestedToken)) score += 6;

      if (normCategory === token || normCategory === suggestedToken) score += 12;

      // Levenshtein check on words in title if no direct hit
      if (score === 0) {
        const titleWords = normTitle.split(" ");
        for (const tw of titleWords) {
          if (tw.length >= 4 && token.length >= 4) {
            const dist = levenshteinDistance(token, tw);
            if (dist <= 2) {
              score += 10 - dist * 3;
              break;
            }
          }
        }
      }
    });

    return { opp, score };
  });

  // Filter out items with 0 score, then sort descending by score
  const matched = scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.opp);

  return {
    results: matched,
    suggestion,
    hasTypos
  };
}
