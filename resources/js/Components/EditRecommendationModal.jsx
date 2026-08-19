import React from "react";

export default function EditRecommendationModal({
    show,
    onClose,
    form,
    setForm,
    onSubmit,
    errors = {},
    processing = false,
}) {
    if (!show) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 rounded-t-2xl">
                        <h2 className="text-xl font-bold text-white">
                            Edit Rekomendasi
                        </h2>
                        <p className="text-amber-100 text-sm mt-1">
                            Status: {form.status}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={onSubmit} className="p-6 space-y-5">
                        {/* Status (readonly) */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Status
                            </label>
                            <input
                                type="text"
                                value={form.status}
                                disabled
                                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                            />
                        </div>

                        {/* Conclusion */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Kesimpulan (Conclusion) <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={form.conclusion}
                                onChange={(e) =>
                                    setForm({ ...form, conclusion: e.target.value })
                                }
                                rows={4}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-y ${
                                    errors.conclusion
                                        ? "border-red-400 bg-red-50"
                                        : "border-gray-300"
                                }`}
                                placeholder="Masukkan teks kesimpulan..."
                            />
                            {errors.conclusion && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.conclusion}
                                </p>
                            )}
                        </div>

                        {/* Recommendation */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Rekomendasi (Recommendation) <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={form.recommendation}
                                onChange={(e) =>
                                    setForm({ ...form, recommendation: e.target.value })
                                }
                                rows={4}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-y ${
                                    errors.recommendation
                                        ? "border-red-400 bg-red-50"
                                        : "border-gray-300"
                                }`}
                                placeholder="Masukkan teks rekomendasi..."
                            />
                            {errors.recommendation && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.recommendation}
                                </p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? "Menyimpan..." : "Simpan Perubahan"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
