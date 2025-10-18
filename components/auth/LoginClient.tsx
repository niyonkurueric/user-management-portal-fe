"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { AxiosError } from "axios";
import { loginRequest } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/schemas/auth/login";
import toast from "react-hot-toast";

export default function LoginClient() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleLogin = async (data: LoginFormData) => {
    setError(null);
    setLoading(true);
    try {
      const { token, user } = await loginRequest(data);
      login(token, user ?? null);
      toast.success("Signed in successfully");
      router.push("/dashboard");
    } catch (err: unknown) {
      // Better error parsing: handle network, validation and server messages
      let message = "Invalid credentials, please try again.";
      const e = err as AxiosError;

      if (e && e.response) {
        // Server responded with a status code outside 2xx
        type RespBody = { message?: string; errors?: Array<{ message?: string }>; } | string;
        const resp = e.response as { data?: RespBody } | undefined;
        const data = resp?.data;
        if (data) {
          if (typeof data === "string") {
            message = data;
          } else {
            const obj = data as { message?: string; errors?: Array<{ message?: string }> };
            if (obj.message) message = obj.message;
            else if (obj.errors && Array.isArray(obj.errors)) {
              // pick first error message if available
              const first = obj.errors[0];
              message = first?.message || JSON.stringify(first) || message;
            }
          }
        }
      } else if (e && e.request) {
        // Request made but no response
        message = "Unable to reach the server. Check your network and try again.";
      } else if (err && typeof err === "object" && "message" in err) {
        // fallback for other error shapes
        const maybe = err as { message?: string };
        message = maybe.message || message;
      }

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-xl bg-slate-900/5 border border-slate-200/60 rounded-2xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900/5 backdrop-blur-sm rounded-full mb-4 border border-slate-200/60">
              <Lock className="w-8 h-8 text-slate-700" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-600 text-sm">Sign in to access your dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="email"
                placeholder="Email address"
                {...register("email")}
                className="pl-11 bg-slate-900/5 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-slate-900/10 focus:border-slate-300 h-12 backdrop-blur-sm transition-all"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className="pl-11 pr-11 bg-slate-900/5 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-slate-900/10 focus:border-slate-300 h-12 backdrop-blur-sm transition-all"
                aria-invalid={errors.password ? "true" : "false"}
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 inline-flex items-center justify-center text-slate-500 hover:text-slate-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>

              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 disabled:opacity-70 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              {loading ? "Signing In…" : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
