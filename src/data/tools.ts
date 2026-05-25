import type { Tool } from "@/types";
import { categories } from "./categories";

const cat = (slug: string) => categories.find((c) => c.slug === slug)?.id || "1";

export const tools: Tool[] = [
  { id: "1", name: "Elicit", slug: "elicit", description: "AI research assistant that automates literature review and paper analysis.", long_description: "Elicit uses language models to help researchers find relevant papers, extract key findings, and synthesize research questions.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=elicit", website_url: "https://elicit.com", affiliate_url: "https://elicit.com?ref=researchaihub", pricing: "freemium", price_label: "From $10/mo", category_id: cat("research-ai"), tags: ["literature review", "research", "papers"], rating: 4.8, review_count: 342, is_featured: true, is_trending: true, is_sponsored: false, is_free: false, features: ["Paper discovery", "Data extraction", "Research summaries"], pros: ["Excellent for systematic reviews", "Saves hours of reading"], cons: ["Premium features costly"], use_cases: ["Literature reviews", "Meta-analysis prep"], screenshots: [], created_at: "2024-01-15", updated_at: "2025-05-01" },
  { id: "2", name: "Consensus", slug: "consensus", description: "Search engine for scientific research with AI-powered answers from papers.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=consensus", website_url: "https://consensus.app", pricing: "freemium", price_label: "Free tier available", category_id: cat("research-ai"), tags: ["search", "evidence", "science"], rating: 4.7, review_count: 289, is_featured: true, is_trending: true, is_sponsored: false, is_free: true, features: ["Evidence-based answers", "Citation links", "Study filters"], pros: ["Trusted scientific sources", "Fast answers"], cons: ["Limited deep analysis"], use_cases: ["Quick fact-checking", "Hypothesis validation"], created_at: "2024-02-01", updated_at: "2025-05-01" },
  { id: "3", name: "Scite", slug: "scite", description: "Smart citations that show how research has been cited—supporting or contrasting.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=scite", website_url: "https://scite.ai", pricing: "paid", price_label: "$20/mo", category_id: cat("research-ai"), tags: ["citations", "verification"], rating: 4.6, review_count: 198, is_featured: true, is_trending: false, is_sponsored: false, is_free: false, features: ["Smart citations", "Citation context", "Browser extension"], pros: ["Unique citation intelligence"], cons: ["Subscription required"], created_at: "2024-01-20", updated_at: "2025-04-15" },
  { id: "4", name: "Semantic Scholar", slug: "semantic-scholar", description: "Free AI-powered research tool for scientific literature discovery.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=semantic", website_url: "https://semanticscholar.org", pricing: "free", price_label: "Free", category_id: cat("research-ai"), tags: ["free", "papers", "discovery"], rating: 4.9, review_count: 1205, is_featured: true, is_trending: true, is_sponsored: false, is_free: true, features: ["Paper recommendations", "TLDR summaries", "Citation graphs"], pros: ["Completely free", "Huge database"], cons: ["Less interactive than paid tools"], created_at: "2023-06-01", updated_at: "2025-05-10" },
  { id: "5", name: "Jenni AI", slug: "jenni-ai", description: "AI writing assistant for academic essays, theses, and research papers.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=jenni", website_url: "https://jenni.ai", affiliate_url: "https://jenni.ai?ref=rah", pricing: "freemium", price_label: "$12/mo", category_id: cat("writing-ai"), tags: ["thesis", "writing", "academic"], rating: 4.5, review_count: 456, is_featured: true, is_trending: true, is_sponsored: true, is_free: false, features: ["Auto-complete", "Citation integration", "PDF upload"], pros: ["Great for thesis drafts"], cons: ["Requires human editing"], created_at: "2024-03-01", updated_at: "2025-05-01" },
  { id: "6", name: "Grammarly", slug: "grammarly", description: "AI-powered writing assistant for grammar, clarity, and tone.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=grammarly", website_url: "https://grammarly.com", pricing: "freemium", price_label: "Free / $12/mo", category_id: cat("writing-ai"), tags: ["grammar", "editing"], rating: 4.7, review_count: 2340, is_featured: false, is_trending: true, is_sponsored: false, is_free: true, features: ["Grammar check", "Tone detector", "Plagiarism check"], pros: ["Ubiquitous integration"], cons: ["Academic features in premium"], created_at: "2023-01-01", updated_at: "2025-05-01" },
  { id: "7", name: "QuillBot", slug: "quillbot", description: "Paraphrasing and summarization tool for academic and professional writing.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=quillbot", website_url: "https://quillbot.com", pricing: "freemium", category_id: cat("writing-ai"), tags: ["paraphrase", "summarize"], rating: 4.4, review_count: 890, is_featured: false, is_trending: false, is_sponsored: false, is_free: true, created_at: "2023-08-01", updated_at: "2025-04-01" },
  { id: "8", name: "Cursor", slug: "cursor", description: "AI-first code editor built for pair programming with AI.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=cursor", website_url: "https://cursor.com", pricing: "freemium", price_label: "Free / $20/mo", category_id: cat("coding-ai"), tags: ["IDE", "coding", "developer"], rating: 4.9, review_count: 678, is_featured: true, is_trending: true, is_sponsored: false, is_free: true, features: ["AI chat in editor", "Codebase context", "Multi-model"], pros: ["Best AI IDE experience"], cons: ["Learning curve for new users"], created_at: "2024-01-01", updated_at: "2025-05-15" },
  { id: "9", name: "GitHub Copilot", slug: "github-copilot", description: "AI pair programmer that suggests code and entire functions in real time.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=copilot", website_url: "https://github.com/features/copilot", pricing: "paid", price_label: "$10/mo", category_id: cat("coding-ai"), tags: ["copilot", "vscode"], rating: 4.6, review_count: 1567, is_featured: true, is_trending: true, is_sponsored: false, is_free: false, created_at: "2022-06-01", updated_at: "2025-05-01" },
  { id: "10", name: "Tabnine", slug: "tabnine", description: "AI code completion that runs locally for privacy-conscious teams.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=tabnine", website_url: "https://tabnine.com", pricing: "freemium", category_id: cat("coding-ai"), tags: ["autocomplete", "privacy"], rating: 4.3, review_count: 234, is_featured: false, is_trending: false, is_sponsored: false, is_free: true, created_at: "2023-04-01", updated_at: "2025-03-01" },
  { id: "11", name: "Notion AI", slug: "notion-ai", description: "AI writing and Q&A built into Notion workspaces.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=notion", website_url: "https://notion.so/product/ai", pricing: "paid", price_label: "$10/mo add-on", category_id: cat("productivity-ai"), tags: ["notes", "wiki", "team"], rating: 4.5, review_count: 987, is_featured: true, is_trending: true, is_sponsored: false, is_free: false, created_at: "2023-11-01", updated_at: "2025-05-01" },
  { id: "12", name: "Motion", slug: "motion", description: "AI calendar and task manager that auto-schedules your day.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=motion", website_url: "https://usemotion.com", pricing: "paid", price_label: "$19/mo", category_id: cat("productivity-ai"), tags: ["calendar", "scheduling"], rating: 4.4, review_count: 312, is_featured: false, is_trending: true, is_sponsored: false, is_free: false, created_at: "2024-02-15", updated_at: "2025-05-01" },
  { id: "13", name: "Reclaim.ai", slug: "reclaim-ai", description: "Smart scheduling for habits, tasks, and meetings.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=reclaim", website_url: "https://reclaim.ai", pricing: "freemium", category_id: cat("productivity-ai"), tags: ["calendar", "habits"], rating: 4.6, review_count: 445, is_featured: false, is_trending: false, is_sponsored: false, is_free: true, created_at: "2023-09-01", updated_at: "2025-04-01" },
  { id: "14", name: "Gamma", slug: "gamma", description: "Create beautiful presentations and documents with AI in minutes.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=gamma", website_url: "https://gamma.app", pricing: "freemium", category_id: cat("presentation-ai"), tags: ["slides", "decks"], rating: 4.7, review_count: 534, is_featured: true, is_trending: true, is_sponsored: false, is_free: true, created_at: "2024-01-10", updated_at: "2025-05-01" },
  { id: "15", name: "Beautiful.ai", slug: "beautiful-ai", description: "Smart templates that auto-format slides as you add content.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=beautiful", website_url: "https://beautiful.ai", pricing: "paid", category_id: cat("presentation-ai"), tags: ["design", "slides"], rating: 4.4, review_count: 267, is_featured: false, is_trending: false, is_sponsored: false, is_free: false, created_at: "2023-05-01", updated_at: "2025-03-01" },
  { id: "16", name: "Miro AI", slug: "miro-ai", description: "AI-powered brainstorming and diagramming on infinite canvas.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=miro", website_url: "https://miro.com/ai", pricing: "freemium", category_id: cat("diagram-ai"), tags: ["whiteboard", "mind map"], rating: 4.6, review_count: 723, is_featured: true, is_trending: false, is_sponsored: false, is_free: true, created_at: "2024-03-15", updated_at: "2025-05-01" },
  { id: "17", name: "Lucidchart", slug: "lucidchart", description: "Intelligent diagramming for flowcharts, ER diagrams, and system design.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=lucid", website_url: "https://lucidchart.com", pricing: "freemium", category_id: cat("diagram-ai"), tags: ["flowchart", "UML"], rating: 4.5, review_count: 612, is_featured: false, is_trending: false, is_sponsored: false, is_free: true, created_at: "2023-02-01", updated_at: "2025-04-01" },
  { id: "18", name: "Descript", slug: "descript", description: "Edit video and podcasts by editing text transcripts.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=descript", website_url: "https://descript.com", pricing: "freemium", category_id: cat("video-ai"), tags: ["editing", "transcription"], rating: 4.7, review_count: 389, is_featured: true, is_trending: true, is_sponsored: false, is_free: true, created_at: "2024-02-01", updated_at: "2025-05-01" },
  { id: "19", name: "Runway", slug: "runway", description: "AI video generation and professional editing suite.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=runway", website_url: "https://runway.ml", pricing: "freemium", category_id: cat("video-ai"), tags: ["generation", "VFX"], rating: 4.5, review_count: 456, is_featured: false, is_trending: true, is_sponsored: false, is_free: true, created_at: "2024-04-01", updated_at: "2025-05-10" },
  { id: "20", name: "Midjourney", slug: "midjourney", description: "Leading AI image generator for artistic and conceptual visuals.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=midjourney", website_url: "https://midjourney.com", pricing: "paid", price_label: "$10/mo", category_id: cat("image-ai"), tags: ["art", "generation"], rating: 4.8, review_count: 1890, is_featured: true, is_trending: true, is_sponsored: false, is_free: false, created_at: "2023-03-01", updated_at: "2025-05-01" },
  { id: "21", name: "DALL·E 3", slug: "dalle-3", description: "OpenAI image generation integrated with ChatGPT.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=dalle", website_url: "https://openai.com/dall-e-3", pricing: "paid", category_id: cat("image-ai"), tags: ["openai", "images"], rating: 4.6, review_count: 934, is_featured: false, is_trending: true, is_sponsored: false, is_free: false, created_at: "2024-01-01", updated_at: "2025-05-01" },
  { id: "22", name: "ChatPDF", slug: "chatpdf", description: "Chat with any PDF document using AI.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=chatpdf", website_url: "https://chatpdf.com", pricing: "freemium", category_id: cat("pdf-tools"), tags: ["pdf", "chat", "summarize"], rating: 4.5, review_count: 567, is_featured: true, is_trending: true, is_sponsored: false, is_free: true, created_at: "2024-02-20", updated_at: "2025-05-01" },
  { id: "23", name: "PDF.ai", slug: "pdf-ai", description: "AI assistant for analyzing, summarizing, and extracting PDF data.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=pdfai", website_url: "https://pdf.ai", pricing: "freemium", category_id: cat("pdf-tools"), tags: ["analysis", "extraction"], rating: 4.3, review_count: 198, is_featured: false, is_trending: false, is_sponsored: false, is_free: true, created_at: "2024-05-01", updated_at: "2025-04-01" },
  { id: "24", name: "Zotero", slug: "zotero", description: "Free reference manager with browser integration and citation styles.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=zotero", website_url: "https://zotero.org", pricing: "free", category_id: cat("citation-tools"), tags: ["references", "bibliography", "free"], rating: 4.9, review_count: 2100, is_featured: true, is_trending: false, is_sponsored: false, is_free: true, created_at: "2022-01-01", updated_at: "2025-05-01" },
  { id: "25", name: "Mendeley", slug: "mendeley", description: "Reference manager and academic social network by Elsevier.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=mendeley", website_url: "https://mendeley.com", pricing: "free", category_id: cat("citation-tools"), tags: ["references", "collaboration"], rating: 4.4, review_count: 876, is_featured: false, is_trending: false, is_sponsored: false, is_free: true, created_at: "2022-06-01", updated_at: "2025-03-01" },
  { id: "26", name: "Zapier", slug: "zapier", description: "Connect apps and automate workflows without code.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=zapier", website_url: "https://zapier.com", pricing: "freemium", category_id: cat("automation-tools"), tags: ["integration", "no-code"], rating: 4.6, review_count: 1456, is_featured: true, is_trending: false, is_sponsored: false, is_free: true, created_at: "2023-01-01", updated_at: "2025-05-01" },
  { id: "27", name: "Make", slug: "make", description: "Visual automation platform for complex multi-step workflows.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=make", website_url: "https://make.com", pricing: "freemium", category_id: cat("automation-tools"), tags: ["automation", "visual"], rating: 4.5, review_count: 534, is_featured: false, is_trending: true, is_sponsored: false, is_free: true, created_at: "2024-01-01", updated_at: "2025-05-01" },
  { id: "28", name: "Perplexity", slug: "perplexity", description: "AI answer engine with real-time web search and citations.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=perplexity", website_url: "https://perplexity.ai", pricing: "freemium", category_id: cat("research-ai"), tags: ["search", "answers", "citations"], rating: 4.8, review_count: 1234, is_featured: true, is_trending: true, is_sponsored: false, is_free: true, created_at: "2024-01-01", updated_at: "2025-05-15" },
  { id: "29", name: "ChatGPT", slug: "chatgpt", description: "Versatile AI assistant for research, coding, writing, and analysis.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=chatgpt", website_url: "https://chat.openai.com", pricing: "freemium", category_id: cat("productivity-ai"), tags: ["assistant", "general"], rating: 4.7, review_count: 5000, is_featured: true, is_trending: true, is_sponsored: false, is_free: true, created_at: "2023-01-01", updated_at: "2025-05-15" },
  { id: "30", name: "Claude", slug: "claude", description: "Anthropic AI assistant excelling at long documents and nuanced analysis.", logo_url: "https://api.dicebear.com/7.x/identicon/svg?seed=claude", website_url: "https://claude.ai", pricing: "freemium", category_id: cat("research-ai"), tags: ["assistant", "analysis"], rating: 4.8, review_count: 2345, is_featured: true, is_trending: true, is_sponsored: false, is_free: true, created_at: "2024-03-01", updated_at: "2025-05-15" },
];

tools.forEach((t) => {
  const catObj = categories.find((c) => c.id === t.category_id);
  if (catObj) t.category = catObj;
});

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getFeaturedTools(limit = 6): Tool[] {
  return tools.filter((t) => t.is_featured).slice(0, limit);
}

export function getTrendingTools(limit = 8): Tool[] {
  return tools.filter((t) => t.is_trending).slice(0, limit);
}

export function getFreeTools(): Tool[] {
  return tools.filter((t) => t.is_free || t.pricing === "free");
}

export function filterTools(filters: {
  search?: string;
  category?: string;
  pricing?: string[];
  freeOnly?: boolean;
  sort?: string;
  tags?: string[];
}): Tool[] {
  let result = [...tools];
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }
  if (filters.category) {
    const c = categories.find((cat) => cat.slug === filters.category);
    if (c) result = result.filter((t) => t.category_id === c.id);
  }
  if (filters.freeOnly) result = result.filter((t) => t.is_free || t.pricing === "free");
  if (filters.pricing?.length) result = result.filter((t) => filters.pricing!.includes(t.pricing));
  if (filters.tags?.length) result = result.filter((t) => filters.tags!.some((tag) => t.tags.includes(tag)));
  switch (filters.sort) {
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      break;
    case "name":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      result.sort((a, b) => b.review_count - a.review_count);
  }
  return result;
}

export function getRelatedTools(tool: Tool, limit = 4): Tool[] {
  return tools
    .filter((t) => t.id !== tool.id && t.category_id === tool.category_id)
    .slice(0, limit);
}

export function getAlternatives(tool: Tool, limit = 3): Tool[] {
  return tools
    .filter((t) => t.id !== tool.id && t.category_id === tool.category_id)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}
