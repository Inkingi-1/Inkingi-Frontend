"use client";

import React, { useCallback, useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { ApiUser } from "@/lib/api/types";
import { roleLabel } from "@/context/AuthContext";
import { ApiError } from "@/lib/api/client";

const ROLES: ApiUser["role"][] = ["customer", "vendor", "delivery", "admin"];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pending, setPending] = useState<Record<string, ApiUser["role"]>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadUsers = useCallback(() => {
    setLoading(true);
    setError("");
    adminApi
      .users(1, 100)
      .then((res) => setUsers(res.data))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filtered = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search)
  );

  const handleRoleSelect = (userId: string, role: ApiUser["role"]) => {
    setPending((prev) => ({ ...prev, [userId]: role }));
  };

  const handleSaveRole = async (user: ApiUser) => {
    const newRole = pending[user._id] ?? user.role;
    if (newRole === user.role) return;

    setSavingId(user._id);
    setMessage("");
    setError("");
    try {
      const updated = await adminApi.assignRole(user._id, newRole);
      setUsers((list) => list.map((u) => (u._id === updated._id ? updated : u)));
      setPending((prev) => {
        const next = { ...prev };
        delete next[user._id];
        return next;
      });
      setMessage(`Role updated for ${user.fullName} → ${roleLabel(newRole)}. They must sign in again.`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not assign role");
    } finally {
      setSavingId(null);
    }
  };

  const handleSuspend = async (user: ApiUser, suspend: boolean) => {
    setSavingId(user._id);
    setError("");
    try {
      await adminApi.suspendUser(user._id, suspend);
      loadUsers();
      setMessage(suspend ? `${user.fullName} suspended` : `${user.fullName} reactivated`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Action failed");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div>
      <h1 className="font-headline-lg text-primary font-bold mb-2">User role management</h1>
      <p className="text-on-surface-variant text-sm mb-6">
        Assign each user exactly one role. Changing a role clears their sessions — they must log in again.
      </p>

      {message && (
        <div className="mb-4 p-3 rounded-xl bg-secondary-container text-on-secondary-container text-sm">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-error-container text-on-error-container text-sm">{error}</div>
      )}

      <div className="mb-6 relative max-w-md">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
          search
        </span>
        <input
          type="search"
          placeholder="Search by name, email, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant/30 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="bg-white rounded-xl border border-outline-variant/15 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-surface-container text-primary font-bold border-b border-outline-variant/15">
                  <th className="p-4">User</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Current role</th>
                  <th className="p-4">Assign role</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filtered.map((user) => {
                    const selected = pending[user._id] ?? user.role;
                    const dirty = selected !== user.role;
                    return (
                      <tr key={user._id} className="hover:bg-surface-container-lowest">
                        <td className="p-4 font-semibold">{user.fullName}</td>
                        <td className="p-4 text-on-surface-variant">{user.email}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-bold">
                            {roleLabel(user.role)}
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={selected}
                            onChange={(e) =>
                              handleRoleSelect(user._id, e.target.value as ApiUser["role"])
                            }
                            className="h-10 px-3 border border-outline-variant rounded-lg text-sm cursor-pointer"
                            disabled={savingId === user._id}
                          >
                            {ROLES.map((r) => (
                              <option key={r} value={r}>
                                {roleLabel(r)}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap justify-center gap-2">
                            <button
                              type="button"
                              disabled={!dirty || savingId === user._id}
                              onClick={() => void handleSaveRole(user)}
                              className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-bold disabled:opacity-40"
                            >
                              {savingId === user._id ? "Saving..." : "Save role"}
                            </button>
                            <button
                              type="button"
                              disabled={savingId === user._id}
                              onClick={() => void handleSuspend(user, true)}
                              className="px-3 py-1.5 border border-error text-error rounded-lg text-xs font-bold"
                            >
                              Suspend
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
