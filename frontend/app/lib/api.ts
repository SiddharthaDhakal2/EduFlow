export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export type LessonType = "Text" | "Video" | "Text and Video";

export type CourseLesson = {
  title: string;
  type: LessonType;
  textContent?: string;
  videoTitle?: string;
  videoUrl?: string;
};

export type Course = {
  id: number;
  slug: string;
  title: string;
  category: string;
  instructor: string;
  difficulty: string;
  duration: string;
  lessons: number;
  students?: number;
  access: "Free" | "Paid";
  status?: "Published" | "Draft";
  image: string;
  description: string;
  lessonItems: CourseLesson[];
  created?: string;
  updated?: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar: string;
  profileImage?: string | null;
  joined: string;
  recentLogin?: string | null;
};

export type Certificate = {
  id: string;
  userId: number;
  userName: string;
  userEmail: string;
  courseSlug: string;
  courseTitle: string;
  instructor: string;
  issuedAt: string;
};

export function getToken() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem("eduflow-token") || "";
}

export function setSession(token: string, user: User) {
  window.localStorage.setItem("eduflow-token", token);
  window.localStorage.setItem("eduflow-user", JSON.stringify(user));
  window.dispatchEvent(new Event("eduflow-auth-updated"));
}

export function clearSession() {
  window.localStorage.removeItem("eduflow-token");
  window.localStorage.removeItem("eduflow-user");
  window.dispatchEvent(new Event("eduflow-auth-updated"));
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const saved = window.localStorage.getItem("eduflow-user");
  if (!saved) return null;
  try {
    return JSON.parse(saved) as User;
  } catch {
    return null;
  }
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const isLoginOrSignup = path.startsWith("/auth/login") || path.startsWith("/auth/register");
    if (response.status === 401 && !isLoginOrSignup && typeof window !== "undefined") {
      clearSession();
      window.location.assign("/login");
      return new Promise<T>(() => {});
    }

    throw new Error(data.message || "Request failed.");
  }

  return data as T;
}

export async function apiUpload<T>(path: string, formData: FormData): Promise<T> {
  const headers = new Headers();
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers,
    body: formData,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") {
      clearSession();
      window.location.assign("/login");
      return new Promise<T>(() => {});
    }

    throw new Error(data.message || "Upload failed.");
  }

  return data as T;
}

export function mediaUrl(path?: string | null) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_BASE_URL.replace(/\/api$/, "")}${path}`;
}
