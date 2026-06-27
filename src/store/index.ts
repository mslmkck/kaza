import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Profile, AccidentCase, TrafficFine, Document, Petition, Question, Notification } from "@/types";

interface AuthState {
  user: Profile | null;
  session: unknown | null;
  loading: boolean;
  setUser: (user: Profile | null) => void;
  setSession: (session: unknown | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      loading: true,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setLoading: (loading) => set({ loading }),
      logout: () => set({ user: null, session: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, session: state.session }),
    }
  )
);

interface UIState {
  sidebarOpen: boolean;
  theme: "light" | "dark" | "system";
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      theme: "system",
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "ui-storage",
    }
  )
);

interface AccidentWizardState {
  currentStep: number;
  step1Data: Record<string, unknown> | null;
  step2Data: Record<string, unknown> | null;
  setCurrentStep: (step: number) => void;
  setStep1Data: (data: Record<string, unknown>) => void;
  setStep2Data: (data: Record<string, unknown>) => void;
  reset: () => void;
}

export const useAccidentWizardStore = create<AccidentWizardState>()(
  persist(
    (set) => ({
      currentStep: 1,
      step1Data: null,
      step2Data: null,
      setCurrentStep: (step) => set({ currentStep: step }),
      setStep1Data: (data) => set({ step1Data: data }),
      setStep2Data: (data) => set({ step2Data: data }),
      reset: () => set({ currentStep: 1, step1Data: null, step2Data: null }),
    }),
    {
      name: "accident-wizard-storage",
    }
  )
);

interface FineAnalysisState {
  formData: Record<string, unknown> | null;
  analysisResult: Record<string, unknown> | null;
  setFormData: (data: Record<string, unknown>) => void;
  setAnalysisResult: (result: Record<string, unknown>) => void;
  reset: () => void;
}

export const useFineAnalysisStore = create<FineAnalysisState>()(
  persist(
    (set) => ({
      formData: null,
      analysisResult: null,
      setFormData: (data) => set({ formData: data }),
      setAnalysisResult: (result) => set({ analysisResult: result }),
      reset: () => set({ formData: null, analysisResult: null }),
    }),
    {
      name: "fine-analysis-storage",
    }
  )
);

interface PetitionBuilderState {
  formData: Record<string, unknown> | null;
  generatedContent: string | null;
  setFormData: (data: Record<string, unknown>) => void;
  setGeneratedContent: (content: string) => void;
  reset: () => void;
}

export const usePetitionBuilderStore = create<PetitionBuilderState>()(
  persist(
    (set) => ({
      formData: null,
      generatedContent: null,
      setFormData: (data) => set({ formData: data }),
      setGeneratedContent: (content) => set({ generatedContent: content }),
      reset: () => set({ formData: null, generatedContent: null }),
    }),
    {
      name: "petition-builder-storage",
    }
  )
);

interface DashboardState {
  stats: {
    openCases: number;
    pendingDocuments: number;
    upcomingDeadlines: number;
    unansweredQuestions: number;
    recentPetitions: number;
  } | null;
  setStats: (stats: DashboardState["stats"]) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  setStats: (stats) => set({ stats }),
}));

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  setUnreadCount: (count: number) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  setNotifications: (notifications) => set({ notifications, unreadCount: notifications.filter((n) => !n.read_at).length }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n)),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read_at: n.read_at || new Date().toISOString() })),
      unreadCount: 0,
    })),
  setUnreadCount: (count) => set({ unreadCount: count }),
}));