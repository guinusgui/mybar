import { distance } from "fastest-levenshtein";

export default function findBestMatches(
  items,
  reference,
  textFields = [],
  discreteFields = [],
) {
  return items
    .map((item) => {
      let score = 0;
      let totalWeight = 0;
      const fieldSimilarity = {};

      // Campos de texto
      for (const field of textFields) {
        totalWeight++;

        const a = String(reference[field] ?? "")
          .toLowerCase()
          .trim();
        const b = String(item[field] ?? "")
          .toLowerCase()
          .trim();

        const maxLen = Math.max(a.length, b.length);

        // Similaridade entre 0 e 1
        const similarity = maxLen === 0 ? 1 : 1 - distance(a, b) / maxLen;

        score += similarity;
        fieldSimilarity[field] = similarity;
      }

      // Campos discretos
      for (const field of discreteFields) {
        totalWeight++;

        const similarity = item[field] === reference[field] ? 1 : 0;
        score += similarity;
        fieldSimilarity[field] = similarity;
      }

      return {
        item,
        similarity: score / totalWeight,
        fieldSimilarity,
      };
    })
    .sort((a, b) => b.similarity - a.similarity);
}
