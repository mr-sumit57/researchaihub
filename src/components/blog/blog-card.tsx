import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="card-hover overflow-hidden">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <CardContent className="p-5">
          <Badge variant="secondary" className="mb-2">
            {post.category}
          </Badge>
          <h3 className="font-semibold leading-snug hover:text-primary">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            <span>{formatDate(post.published_at)}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.reading_time} min read
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
