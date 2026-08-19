import React from "react";
import { Trash2, X } from "lucide-react";

export default function DeleteFeedingTypeModal({
    isOpen,
    onClose,
    onConfirm,
    processing,
    parameter,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
                className="absolute inset-0 bg-black/50 transition-all duration-500"
                onClick={onClose}
            >
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-400/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl animate-float-delayed"></div>
            </div>

            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-md w-full transform transition-all animate-modal-appear overflow-hidden border border-white/30">
                <div className="h-1.5 bg-gradient-to-r from-red-500 via-rose-500 to-red-600 shadow-lg"></div>

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all duration-300 group z-10 border border-white/40 hover:border-white/60 shadow-lg"
                >
                    <X className="text-xl text-white group-hover:rotate-90 transition-all duration-300 drop-shadow-lg" />
                </button>

                <div className="p-6">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-red-500 via-rose-500 to-red-600 rounded-2xl mb-3 shadow-xl border-4 border-white/30">
                            <Trash2 className="text-white text-2xl drop-shadow-lg" />
                        </div>
                        <h3 className="text-xl font-bold text-white drop-shadow-lg">
                            Hapus Parameter
                        </h3>
                        <p className="text-white/80 text-sm mt-1">
                            Apakah Anda yakin ingin menghapus feeding type ini?
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 mb-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-white/60">ID:</span>
                                <span className="text-white font-semibold">{parameter?.id}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-white/60">Kode:</span>
                                <span className="text-white font-semibold">{parameter?.code}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-white/60">Nama:</span>
                                <span className="text-white font-semibold">{parameter?.name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-white/60">Bobot:</span>
                                <span className="text-white font-semibold">{parameter?.weight}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-white/20 backdrop-blur-md border-2 border-white/40 text-white font-semibold py-2 px-4 rounded-lg hover:bg-white/30 hover:border-white/60 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={processing}
                            className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group border border-white/20 disabled:opacity-50"
                        >
                            <span className="relative z-10">{processing ? "Menghapus..." : "Hapus"}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
