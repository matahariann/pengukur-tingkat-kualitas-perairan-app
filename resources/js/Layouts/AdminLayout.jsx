import React, { useState } from "react";
import { router } from "@inertiajs/react";
import AdminSidebar from "./AdminSidebar";
import LogoutModal from "../Components/LogoutModal";

const AdminLayout = ({ children }) => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        router.post("/logout");
        setShowLogoutModal(false);
    };

    return (
        <>
            <div className="flex h-screen bg-gray-50 overflow-hidden">
                <AdminSidebar handleLogout={() => setShowLogoutModal(true)} />
                <main className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden">
                    <div className="flex-1 pb-6">
                        {children}
                    </div>
                </main>
            </div>

            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
            />
        </>
    );
};

export default AdminLayout;