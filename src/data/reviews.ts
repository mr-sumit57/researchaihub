import type { Review } from "@/types";

export const sampleReviews: Review[] = [
  { id: "1", tool_id: "1", user_id: "u1", user_name: "Alex M.", rating: 5, comment: "Transformed my systematic review workflow. Cut literature screening time by 60%.", created_at: "2025-04-01" },
  { id: "2", tool_id: "1", user_id: "u2", user_name: "Priya S.", rating: 4, comment: "Powerful but the learning curve is steep for first-time users.", created_at: "2025-03-15" },
  { id: "3", tool_id: "8", user_id: "u3", user_name: "DevChris", rating: 5, comment: "Best AI coding experience I've had. Codebase context is a game changer.", created_at: "2025-05-01" },
  { id: "4", tool_id: "28", user_id: "u4", user_name: "ResearchTom", rating: 5, comment: "My go-to for quick research questions with proper citations.", created_at: "2025-04-20" },
  { id: "5", tool_id: "5", user_id: "u5", user_name: "GradStudent99", rating: 4, comment: "Helpful for thesis drafts but always edit the output yourself.", created_at: "2025-03-28" },
];

export function getReviewsForTool(toolId: string): Review[] {
  return sampleReviews.filter((r) => r.tool_id === toolId);
}
