import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    Fish,
    Droplets,
    Award,
    ArrowRight,
    CheckCircle,
    Menu,
    X,
} from "lucide-react";

export default function AquaLife() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setMobileMenuOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
            {/* Navigation */}
            <nav className="bg-white shadow-md fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <img
                                src="Logo.png"
                                alt="Logo"
                                className="w-14 h-14 mr-4"
                            />
                            <img
                                src="cemebsa-logo.png"
                                alt="Cemebsa Logo"
                                className="w-25 h-14"
                            />
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8">
                            <button
                                onClick={() => scrollToSection("home")}
                                className="text-gray-700 hover:text-blue-600 font-medium transition"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => scrollToSection("about")}
                                className="text-gray-700 hover:text-blue-600 font-medium transition"
                            >
                                About
                            </button>
                            <button
                                onClick={() => scrollToSection("services")}
                                className="text-gray-700 hover:text-blue-600 font-medium transition"
                            >
                                Services
                            </button>
                            <button
                                onClick={() => scrollToSection("pricing")}
                                className="text-gray-700 hover:text-blue-600 font-medium transition"
                            >
                                Pricing
                            </button>
                        </div>

                        <div className="hidden md:flex space-x-4">
                            <Link
                                href="/registrasi"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition inline-flex items-center"
                            >
                                Sign Up
                            </Link>
                            <Link
                                href="/login"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition inline-flex items-center"
                            >
                                Sign In
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-4 py-4 space-y-3">
                            <button
                                onClick={() => scrollToSection("home")}
                                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => scrollToSection("about")}
                                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium"
                            >
                                About
                            </button>
                            <button
                                onClick={() => scrollToSection("services")}
                                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium"
                            >
                                Services
                            </button>
                            <button
                                onClick={() => scrollToSection("pricing")}
                                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium"
                            >
                                Pricing
                            </button>
                            <button className="w-full px-6 py-2 text-blue-600 border-2 border-blue-600 rounded-lg font-medium">
                                Sign Up
                            </button>
                            <button
                                className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg font-medium"
                                onClick={() => navigate("/login")}
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section 
                id="home" 
                className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/background.png')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-2xl py-12">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                                Hitung Kualitas Air Budidaya Perikanan dengan
                                Mudah dan Akurat
                            </h1>
                            <p className="text-lg text-white/90 mb-8 drop-shadow-md">
                                AquaLife membantu Anda menghitung dan menilai
                                kualitas air budidaya berdasarkan parameter
                                fisik-kimia, indeks biotik, dan keluarga biotik
                                untuk memastikan kondisi air yang optimal bagi
                                ikan Anda.
                            </p>
                            <button
                                onClick={() => scrollToSection("services")}
                                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition flex items-center space-x-2 shadow-lg"
                            >
                                <span>Get Started</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                            Tentang AquaLife
                        </h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 hover:shadow-lg transition">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Droplets className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-blue-900 mb-3">
                                Input Parameter Lengkap
                            </h3>
                            <p className="text-gray-600">
                                Masukkan data main parameter seperti pH, suhu,
                                DO, dan parameter penting lainnya dengan mudah
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 hover:shadow-lg transition">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-blue-900 mb-3">
                                Analisis Indeks Biotik
                            </h3>
                            <p className="text-gray-600">
                                Hitung kualitas air berdasarkan indeks biotik
                                dan family biotik untuk penilaian ekosistem yang
                                komprehensif
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 hover:shadow-lg transition">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Fish className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-blue-900 mb-3">
                                Hasil Penilaian Instan
                            </h3>
                            <p className="text-gray-600">
                                Dapatkan hasil perhitungan dan penilaian
                                kualitas air secara langsung setelah memasukkan
                                semua parameter
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                            Layanan Kami
                        </h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Dengan membership AquaLife, Anda dapat menghitung
                            kualitas air budidaya dengan memasukkan berbagai
                            parameter penting untuk mendapatkan penilaian yang
                            akurat
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
                        <div className="text-center mb-6">
                            <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                                <Droplets className="w-12 h-12 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-blue-900 mb-2">
                                Perhitungan Kualitas Air
                            </h3>
                            <p className="text-gray-600">
                                Layanan unggulan untuk pelaku usaha perikanan
                            </p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start space-x-3">
                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                <p className="text-gray-700">
                                    Input Main Parameter: pH, suhu, oksigen
                                    terlarut (DO), TDS, turbidity, dll
                                </p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                <p className="text-gray-700">
                                    Perhitungan Index Biotic untuk menilai
                                    kualitas ekosistem perairan
                                </p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                <p className="text-gray-700">
                                    Input Additional Parameter sesuai kebutuhan
                                    analisis Anda
                                </p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                <p className="text-gray-700">
                                    Data Family Biotic untuk penilaian
                                    keanekaragaman hayati
                                </p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                <p className="text-gray-700">
                                    Hasil perhitungan kualitas air yang
                                    komprehensif dan mudah dipahami
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => scrollToSection("pricing")}
                            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition shadow-lg"
                        >
                            Lihat Harga
                        </button>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section
                id="pricing"
                className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                            Harga Membership
                        </h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">
                            Investasi terbaik untuk kesuksesan bisnis budidaya
                            perikanan Anda
                        </p>
                    </div>

                    <div className="max-w-lg mx-auto">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full -mr-16 -mt-16 opacity-50"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-800 rounded-full -ml-20 -mb-20 opacity-30"></div>

                            <div className="relative z-10">
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold mb-2">
                                        Premium Membership
                                    </h3>
                                    <p className="text-blue-100">
                                        Akses penuh ke semua fitur AquaLife
                                    </p>
                                </div>

                                <div className="text-center mb-8">
                                    <div className="text-5xl font-bold mb-2">
                                        Rp 500.000
                                    </div>
                                    <div className="text-blue-100">
                                        per bulan
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <span>
                                            Akses unlimited perhitungan kualitas
                                            air
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <span>
                                            Form input untuk semua parameter
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <span>
                                            Perhitungan main parameter lengkap
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <span>
                                            Analisis index biotic dan family
                                            biotic
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <span>
                                            Hasil penilaian kualitas air detail
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <span>
                                            Riwayat perhitungan tersimpan
                                        </span>
                                    </div>
                                </div>

                                <button className="w-full px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-bold transition shadow-lg">
                                    Mulai Sekarang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-900 text-white py-8 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <img src="Logo.png" alt="Logo" className="w-14 h-14" />
                        <span className="text-2xl font-bold">AquaLife</span>
                    </div>
                    <p className="text-blue-200 mb-4">
                        Aplikasi perhitungan kualitas air untuk budidaya
                        perikanan
                    </p>
                    <p className="text-blue-300 text-sm">
                        © 2026 AquaLife. All rights reserved.
                    </p>
                </div>
            </footer>

            <style>{`
        .wave {
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }
      `}</style>
        </div>
    );
}
