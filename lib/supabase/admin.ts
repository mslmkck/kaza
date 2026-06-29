import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Server-side client (service role - admin operations)
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey)

// Role check helper
export async function isAdmin(userId: string): Promise<boolean> {
  const { data } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()
  
  return data?.role === 'admin'
}

// Get dashboard stats
export async function getAdminStats() {
  const [
    { count: totalUsers },
    { count: totalQuestions },
    { count: openCases },
    { count: pendingQuestions },
  ] = await Promise.all([
    supabaseAdmin.from('profiles').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('questions').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('cases').select('*', { count: 'exact', head: true }).eq('status', 'open'),
    supabaseAdmin.from('questions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
  ])

  // Today's new users
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const { count: todayNewUsers } = await supabaseAdmin
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', today.toISOString())

  return {
    totalUsers: totalUsers || 0,
    todayNewUsers: todayNewUsers || 0,
    totalQuestions: totalQuestions || 0,
    openCases: openCases || 0,
    pendingQuestions: pendingQuestions || 0,
  }
}

// Get recent users
export async function getRecentUsers(limit = 10) {
  const { data } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  
  return data || []
}

// Get recent questions
export async function getRecentQuestions(limit = 10) {
  const { data } = await supabaseAdmin
    .from('questions')
    .select(`
      *,
      profiles:user_id (full_name, email)
    `)
    .order('created_at', { ascending: false })
    .limit(limit)
  
  return data || []
}

// Get all users with pagination
export async function getAllUsers(page = 1, limit = 20, search?: string) {
  let query = supabaseAdmin
    .from('profiles')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (search) {
    query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
  }

  const { data, count } = await query
  
  return {
    users: data || [],
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  }
}

// Update user role
export async function updateUserRole(userId: string, role: 'user' | 'expert' | 'admin') {
  const { error } = await supabaseAdmin
    .from('profiles')
    .update({ role, updated_at: new Date().toISOString() })
    .eq('id', userId)
  
  return { success: !error, error }
}

// Get all questions with pagination
export async function getAllQuestions(page = 1, limit = 20, status?: string) {
  let query = supabaseAdmin
    .from('questions')
    .select(`
      *,
      profiles:user_id (full_name, email),
      answers (count)
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  const { data, count } = await query
  
  return {
    questions: data || [],
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  }
}

// Update question status
export async function updateQuestionStatus(questionId: string, status: 'pending' | 'answered' | 'closed') {
  const { error } = await supabaseAdmin
    .from('questions')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', questionId)
  
  return { success: !error, error }
}

// Get all cases
export async function getAllCases(page = 1, limit = 20, status?: string) {
  let query = supabaseAdmin
    .from('cases')
    .select(`
      *,
      profiles:user_id (full_name, email)
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  const { data, count } = await query
  
  return {
    cases: data || [],
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  }
}

// Get analytics data
export async function getAnalyticsData(days = 30) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const [usersGrowth, questionsByCategory, casesByStatus] = await Promise.all([
    // Daily new users in last N days
    supabaseAdmin
      .from('profiles')
      .select('created_at')
      .gte('created_at', startDate.toISOString())
      .then(({ data }) => {
        const daily: Record<string, number> = {}
        data?.forEach(user => {
          const day = new Date(user.created_at).toISOString().split('T')[0]
          daily[day] = (daily[day] || 0) + 1
        })
        return daily
      }),
    
    // Questions by category
    supabaseAdmin
      .from('questions')
      .select('category')
      .then(({ data }) => {
        const categories: Record<string, number> = {}
        data?.forEach(q => {
          categories[q.category] = (categories[q.category] || 0) + 1
        })
        return categories
      }),

    // Cases by status
    supabaseAdmin
      .from('cases')
      .select('status')
      .then(({ data }) => {
        const statuses: Record<string, number> = {}
        data?.forEach(c => {
          statuses[c.status] = (statuses[c.status] || 0) + 1
        })
        return statuses
      }),
  ])

  return { usersGrowth, questionsByCategory, casesByStatus }
}
