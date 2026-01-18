import React from "react";
import AdminLayout from "../../../Layouts/AdminLayout";

export default function AdminKelolaPengguna() {
    return (
        <AdminLayout>
            <main className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl px-10 py-8 text-center">
                    <h1 className="text-4xl font-extrabold text-blue-600 mb-2">
                        Admin Kelola Pengguna
                    </h1>
                </div>
            </main>
        </AdminLayout>
    );
}
