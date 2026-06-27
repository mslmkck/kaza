import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { AccidentCase, TrafficFine, Document, Petition, Question, Notification } from "@/types";

const supabase = createClient();

const queryKeys = {
  accidentCases: ["accidentCases"] as const,
  accidentCase: (id: string) => ["accidentCases", id] as const,
  trafficFines: ["trafficFines"] as const,
  trafficFine: (id: string) => ["trafficFines", id] as const,
  documents: (caseId?: string, fineId?: string) => ["documents", caseId, fineId] as const,
  petitions: ["petitions"] as const,
  petition: (id: string) => ["petitions", id] as const,
  questions: ["questions"] as const,
  question: (id: string) => ["questions", id] as const,
  notifications: ["notifications"] as const,
  dashboardStats: ["dashboardStats"] as const,
};

// Accident Cases
export function useAccidentCases() {
  return useQuery({
    queryKey: queryKeys.accidentCases,
    queryFn: async () => {
      const { data, error } = await supabase.from("accident_cases").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as AccidentCase[];
    },
  });
}

export function useAccidentCase(id: string) {
  return useQuery({
    queryKey: queryKeys.accidentCase(id),
    queryFn: async () => {
      const { data, error } = await supabase.from("accident_cases").select("*").eq("id", id).single();
      if (error) throw error;
      return data as AccidentCase;
    },
    enabled: !!id,
  });
}

export function useCreateAccidentCase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCase: Omit<AccidentCase, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase.from("accident_cases").insert(newCase).select().single();
      if (error) throw error;
      return data as AccidentCase;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.accidentCases });
    },
  });
}

export function useUpdateAccidentCase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<AccidentCase> }) => {
      const { data, error } = await supabase.from("accident_cases").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data as AccidentCase;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.accidentCases });
      queryClient.invalidateQueries({ queryKey: queryKeys.accidentCase(data.id) });
    },
  });
}

// Traffic Fines
export function useTrafficFines() {
  return useQuery({
    queryKey: queryKeys.trafficFines,
    queryFn: async () => {
      const { data, error } = await supabase.from("traffic_fines").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as TrafficFine[];
    },
  });
}

export function useTrafficFine(id: string) {
  return useQuery({
    queryKey: queryKeys.trafficFine(id),
    queryFn: async () => {
      const { data, error } = await supabase.from("traffic_fines").select("*").eq("id", id).single();
      if (error) throw error;
      return data as TrafficFine;
    },
    enabled: !!id,
  });
}

export function useCreateTrafficFine() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (fine: Omit<TrafficFine, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase.from("traffic_fines").insert(fine).select().single();
      if (error) throw error;
      return data as TrafficFine;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trafficFines });
    },
  });
}

export function useUpdateTrafficFine() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<TrafficFine> }) => {
      const { data, error } = await supabase.from("traffic_fines").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data as TrafficFine;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trafficFines });
      queryClient.invalidateQueries({ queryKey: queryKeys.trafficFine(data.id) });
    },
  });
}

// Documents
export function useDocuments(caseId?: string, fineId?: string) {
  return useQuery({
    queryKey: queryKeys.documents(caseId, fineId),
    queryFn: async () => {
      let query = supabase.from("documents").select("*");
      if (caseId) query = query.eq("case_id", caseId);
      if (fineId) query = query.eq("fine_id", fineId);
      const { data, error } = await query.order("uploaded_at", { ascending: false });
      if (error) throw error;
      return data as Document[];
    },
  });
}

export function useUploadDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (document: Omit<Document, "id" | "uploaded_at" | "reviewed_at" | "reviewer_id" | "notes">) => {
      const { data, error } = await supabase.from("documents").insert(document).select().single();
      if (error) throw error;
      return data as Document;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.documents(data.case_id ?? undefined, data.fine_id ?? undefined) });
    },
  });
}

export function useUpdateDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Document> }) => {
      const { data, error } = await supabase.from("documents").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data as Document;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.documents(data.case_id ?? undefined, data.fine_id ?? undefined) });
    },
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("documents").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
}

// Petitions
export function usePetitions() {
  return useQuery({
    queryKey: queryKeys.petitions,
    queryFn: async () => {
      const { data, error } = await supabase.from("petitions").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Petition[];
    },
  });
}

export function useCreatePetition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (petition: Omit<Petition, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase.from("petitions").insert(petition).select().single();
      if (error) throw error;
      return data as Petition;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.petitions });
    },
  });
}

// Questions
export function useQuestions() {
  return useQuery({
    queryKey: queryKeys.questions,
    queryFn: async () => {
      const { data, error } = await supabase.from("questions").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Question[];
    },
  });
}

export function useQuestion(id: string) {
  return useQuery({
    queryKey: queryKeys.question(id),
    queryFn: async () => {
      const { data, error } = await supabase.from("questions").select("*").eq("id", id).single();
      if (error) throw error;
      return data as Question;
    },
    enabled: !!id,
  });
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (question: Omit<Question, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase.from("questions").insert(question).select().single();
      if (error) throw error;
      return data as Question;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.questions });
    },
  });
}

// Notifications
export function useNotifications() {
  return useQuery({
    queryKey: queryKeys.notifications,
    queryFn: async () => {
      const { data, error } = await supabase.from("notifications").select("*").order("created_at", { ascending: false }).limit(50);
      if (error) throw error;
      return data as Notification[];
    },
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("notifications").update({ read_at: new Date().toISOString() }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
    },
  });
}

// Dashboard Stats
export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.dashboardStats,
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return null;

      const [
        { count: openCases },
        { count: pendingDocuments },
        { count: upcomingDeadlines },
        { count: unansweredQuestions },
        { count: recentPetitions },
      ] = await Promise.all([
        supabase.from("accident_cases").select("*", { count: "exact", head: true }).eq("user_id", user.user.id).neq("status", "completed"),
        supabase.from("documents").select("*", { count: "exact", head: true }).eq("user_id", user.user.id).eq("review_status", "pending_review"),
        supabase.from("traffic_fines").select("*", { count: "exact", head: true }).eq("user_id", user.user.id).lt("notification_date", new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()),
        supabase.from("questions").select("*", { count: "exact", head: true }).eq("user_id", user.user.id).eq("status", "new"),
        supabase.from("petitions").select("*", { count: "exact", head: true }).eq("user_id", user.user.id).gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
      ]);

      return {
        openCases: openCases || 0,
        pendingDocuments: pendingDocuments || 0,
        upcomingDeadlines: upcomingDeadlines || 0,
        unansweredQuestions: unansweredQuestions || 0,
        recentPetitions: recentPetitions || 0,
      };
    },
  });
}