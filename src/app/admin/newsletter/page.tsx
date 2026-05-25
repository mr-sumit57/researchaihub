import { Card, CardContent } from "@/components/ui/card";

export default function AdminNewsletterPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Newsletter Subscribers</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Subscriber list stored in <code className="rounded bg-muted px-1">newsletter_subscribers</code> when Supabase is connected.
      </p>
      <Card className="mt-8">
        <CardContent className="p-8 text-center text-muted-foreground">
          <p>Export subscribers from Supabase dashboard or build an export API.</p>
          <p className="mt-2 text-sm">Newsletter sponsorship slots available on /newsletter page.</p>
        </CardContent>
      </Card>
    </div>
  );
}
