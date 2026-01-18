import React from "react";
import { Plus, X } from "lucide-react";

export default function AddUserModal({ isOpen, onClose, form, setForm, onSubmit }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
                className="absolute inset-0 bg-black/50 transition-all duration-500"
                onClick={onClose}
            >
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl animate-float-delayed"></div>
            </div>

            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-md w-full transform transition-all animate-modal-appear overflow-hidden border border-white/30 max-h-[90vh] overflow-y-auto">
                <div className="h-1.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 shadow-lg"></div>

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all duration-300 group z-10 border border-white/40 hover:border-white/60 shadow-lg"
                >
                    <X className="text-xl text-white group-hover:rotate-90 transition-all duration-300 drop-shadow-lg" />
                </button>

                <div className="p-6">
                    <div className="text-center mb-4">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 via-cyan-500 to-emerald-500 rounded-2xl mb-3 shadow-xl border-4 border-white/30">
                            <Plus className="text-white text-2xl drop-shadow-lg" />
                        </div>
                        <h3 className="text-xl font-bold text-white drop-shadow-lg">
                            Tambah Pengguna
                        </h3>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-3">
                        <div>
                            <label className="block text-sm font-semibold text-white mb-1.5 drop-shadow-md">
                                Nama
                            </label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-lg text-white placeholder-white/60 focus:bg-white/30 focus:border-white/60 focus:outline-none transition-all"
                                placeholder="Masukkan nama"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white mb-1.5 drop-shadow-md">
                                Email
                            </label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-lg text-white placeholder-white/60 focus:bg-white/30 focus:border-white/60 focus:outline-none transition-all"
                                placeholder="email@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white mb-1.5 drop-shadow-md">
                                Password
                            </label>
                            <input
                                type="password"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-lg text-white placeholder-white/60 focus:bg-white/30 focus:border-white/60 focus:outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white mb-1.5 drop-shadow-md">
                                Role
                            </label>
                            <select
                                value={form.role}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        role: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-lg text-white focus:bg-white/30 focus:border-white/60 focus:outline-none transition-all"
                                required
                            >
                                <option value="member" className="text-gray-900">
                                    Member
                                </option>
                                <option value="operator" className="text-gray-900">
                                    Operator
                                </option>
                                <option value="admin" className="text-gray-900">
                                    Admin
                                </option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/30">
                            <input
                                type="checkbox"
                                id="add_membership"
                                checked={form.is_membership}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        is_membership: e.target.checked,
                                    })
                                }
                                className="w-4 h-4 rounded bg-white/20 border-2 border-white/40"
                            />
                            <label
                                htmlFor="add_membership"
                                className="text-sm font-semibold text-white drop-shadow-md cursor-pointer"
                            >
                                Membership Aktif
                            </label>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-white/20 backdrop-blur-md border-2 border-white/40 text-white font-semibold py-2 px-4 rounded-lg hover:bg-white/30 hover:border-white/60 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-700 hover:via-cyan-600 hover:to-emerald-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group border border-white/20"
                            >
                                <span className="relative z-10">Simpan</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                            </button>
                        </div>
                    </form>
                </div>

                <div className="relative h-3 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                </div>
            </div>
        </div>
    );
}