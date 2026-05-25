import type { Category } from "@/types";

export const categories: Category[] = [
  { id: "1", name: "Research AI", slug: "research-ai", description: "AI tools for academic research, literature review, and data analysis.", icon: "Microscope" },
  { id: "2", name: "Writing AI", slug: "writing-ai", description: "Thesis writing, academic papers, and content generation tools.", icon: "PenLine" },
  { id: "3", name: "Coding AI", slug: "coding-ai", description: "AI assistants for developers, code generation, and debugging.", icon: "Code2" },
  { id: "4", name: "Productivity AI", slug: "productivity-ai", description: "Workflow automation, task management, and efficiency boosters.", icon: "Zap" },
  { id: "5", name: "Presentation AI", slug: "presentation-ai", description: "Create stunning slides and presentations with AI.", icon: "Presentation" },
  { id: "6", name: "Diagram AI", slug: "diagram-ai", description: "Flowcharts, mind maps, and technical diagrams.", icon: "GitBranch" },
  { id: "7", name: "Video AI", slug: "video-ai", description: "Video editing, generation, and transcription tools.", icon: "Video" },
  { id: "8", name: "Image AI", slug: "image-ai", description: "Image generation, editing, and enhancement.", icon: "Image" },
  { id: "9", name: "PDF Tools", slug: "pdf-tools", description: "PDF parsing, summarization, and document analysis.", icon: "FileText" },
  { id: "10", name: "Citation Tools", slug: "citation-tools", description: "Reference management and bibliography generation.", icon: "BookMarked" },
  { id: "11", name: "Automation Tools", slug: "automation-tools", description: "Workflow automation and integration platforms.", icon: "Workflow" },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
