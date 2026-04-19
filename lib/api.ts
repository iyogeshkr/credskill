import type { ApplicantProfile } from "@/types";

const PHP_API_BASE = process.env.NEXT_PUBLIC_PHP_API_BASE || "";

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: "student" | "employer";
};

type AuthUser = {
  id: number;
  name: string;
  email: string;
  role?: "student" | "employer" | string;
};

type SignupResponse = {
  status: "success" | "error";
  user_id?: number;
  name?: string;
  email?: string;
  role?: "student" | "employer";
  message?: string;
};

type LoginResponse = {
  status: "success" | "wrong_password" | "no_user" | "error";
  user_id?: number;
  name?: string;
  email?: string;
  role?: "student" | "employer";
  message?: string;
};

type SaveProfileResponse = {
  status: "success" | "error";
  score?: number;
  message?: string;
};

type InterestedResponse = {
  status: "saved" | "error";
  message?: string;
};

function buildUrl(fileName: string): string {
  const base = PHP_API_BASE.trim();
  if (!base) {
    return `/${fileName}`;
  }
  return `${base.replace(/\/$/, "")}/${fileName}`;
}

function parseExperience(value: string): number {
  const match = value.match(/\d+/);
  if (!match) return 0;
  return Number.parseInt(match[0], 10) || 0;
}

async function postForm<T>(fileName: string, payload: Record<string, string>): Promise<T> {
  const response = await fetch(buildUrl(fileName), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(payload).toString(),
  });

  const data = (await response.json().catch(() => ({}))) as T & {
    message?: string;
  };

  if (!response.ok) {
    throw {
      status: response.status,
      message: data?.message || "Request failed",
      data,
    };
  }

  return data;
}

export const api = {
  async register(body: RegisterPayload): Promise<AuthUser> {
    const response = await postForm<SignupResponse>("signup.php", {
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role,
    });

    if (response.status !== "success" || !response.user_id) {
      throw {
        status: 400,
        message: response.message || "Registration failed",
      };
    }

    return {
      id: response.user_id,
      name: response.name || body.name,
      email: response.email || body.email,
      role: response.role || body.role,
    };
  },

  async login(body: { email: string; password: string }): Promise<AuthUser> {
    const response = await postForm<LoginResponse>("login.php", {
      email: body.email,
      password: body.password,
    });

    if (response.status === "wrong_password") {
      throw { status: 401, message: "Wrong password" };
    }
    if (response.status === "no_user") {
      throw { status: 404, message: "No user found" };
    }
    if (response.status !== "success" || !response.user_id) {
      throw { status: 400, message: response.message || "Login failed" };
    }

    return {
      id: response.user_id,
      name: response.name || "",
      email: response.email || body.email,
      role: response.role || "student",
    };
  },

  async saveProfile(userId: number, profile: ApplicantProfile): Promise<number> {
    const response = await postForm<SaveProfileResponse>("saveProfile.php", {
      user_id: String(userId),
      education: profile.educationLevel,
      skills: profile.skills.join(","),
      experience: String(parseExperience(profile.profession)),
      portfolio: profile.portfolioUrl || profile.githubUrl || "",
    });

    if (response.status !== "success") {
      throw {
        status: 400,
        message: response.message || "Could not save profile",
      };
    }

    return response.score || 0;
  },

  async saveInterestedUser(email: string): Promise<void> {
    const response = await postForm<InterestedResponse>("interested.php", {
      email,
    });

    if (response.status !== "saved") {
      throw {
        status: 400,
        message: response.message || "Could not save interested user",
      };
    }
  },
};

export type { AuthUser, RegisterPayload };
