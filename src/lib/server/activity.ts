import { getSupabaseAdmin } from "@/lib/server/supabase";

type ActivityInput = {
  action: "created" | "updated" | "deleted";
  entityType: "inquiry" | "customer" | "offer" | "invoice" | "settings" | "reference";
  entityId?: string | null;
  title?: string | null;
  description?: string | null;
  metadata?: Record<string, unknown>;
};

export async function logActivity(input: ActivityInput) {
  try {
    await getSupabaseAdmin().from("activity_logs").insert({
      actor: "admin",
      action: input.action,
      entity_type: input.entityType,
      entity_id: input.entityId || null,
      title: input.title || null,
      description: input.description || null,
      metadata: input.metadata || {},
    });
  } catch {
    // The activity archive is helpful, but missing migrations must not break admin workflows.
  }
}
