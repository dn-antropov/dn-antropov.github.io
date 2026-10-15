import milestones from './milestones.json';

const sorted = [...milestones].sort((a, b) => a.score - b.score);

export const milestoneValue = (field, score, fallback) => {
  let value = fallback;
  for (const milestone of sorted) {
    if (score >= milestone.score && milestone[field] != null) value = milestone[field];
  }
  return value;
};
