import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, History, Search, Filter, X } from "lucide-react";
import { FaEye, FaPrint } from "react-icons/fa";
import { router, Link } from "@inertiajs/react";
import OperatorLayout from "../../../Layouts/OperatorLayout";

export default function OperatorKelolaStation({ histories, geoZones = [], waterTypes = [], filters = {} }) {
    const [perPage, setPerPage] = useState(histories?.per_page || 10);
    const [search, setSearch] = useState(filters.search || "");
    const [selectedGeoZone, setSelectedGeoZone] = useState(filters.geo_zone || "");
    const [selectedWaterType, setSelectedWaterType] = useState(filters.water_type || "");
    const [selectedStatus, setSelectedStatus] = useState(filters.status || "");
    const [selectedMethod, setSelectedMethod] = useState(filters.method || "");
    const [showFilters, setShowFilters] = useState(
        !!(filters.geo_zone || filters.water_type || filters.status || filters.method)
    );

    const statusOptions = [
        "Undisturbed Areas",
        "Lightly Disturbed Areas",
        "Moderately Disturbed Areas",
        "Heavily Disturbed Areas",
    ];

    const methodOptions = ["WSM", "SAW"];

    useEffect(() => {
        if (histories?.per_page) {
            setPerPage(histories.per_page);
        }
    }, [histories?.per_page]);

    // Sync filters from server when props change
    useEffect(() => {
        setSearch(filters.search || "");
        setSelectedGeoZone(filters.geo_zone || "");
        setSelectedWaterType(filters.water_type || "");
        setSelectedStatus(filters.status || "");
        setSelectedMethod(filters.method || "");
    }, [filters]);

    const buildParams = useCallback((overrides = {}) => {
        const params = {
            per_page: perPage,
            search: search,
            geo_zone: selectedGeoZone,
            water_type: selectedWaterType,
            status: selectedStatus,
            method: selectedMethod,
            ...overrides,
        };
        // Remove empty params
        Object.keys(params).forEach((key) => {
            if (params[key] === "" || params[key] === null || params[key] === undefined) {
                delete params[key];
            }
        });
        return params;
    }, [perPage, search, selectedGeoZone, selectedWaterType, selectedStatus, selectedMethod]);

    const applyFilters = useCallback((overrides = {}) => {
        const params = buildParams({ ...overrides, page: 1 });
        router.get("/operator/kelola-station", params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }, [buildParams]);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || "")) {
                applyFilters({ search });
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const handleFilterChange = (key, value) => {
        const setterMap = {
            geo_zone: setSelectedGeoZone,
            water_type: setSelectedWaterType,
            status: setSelectedStatus,
            method: setSelectedMethod,
        };
        setterMap[key](value);
        applyFilters({ [key]: value });
    };

    const handleReset = () => {
        setSearch("");
        setSelectedGeoZone("");
        setSelectedWaterType("");
        setSelectedStatus("");
        setSelectedMethod("");
        router.get("/operator/kelola-station", { per_page: perPage }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const hasActiveFilters = search || selectedGeoZone || selectedWaterType || selectedStatus || selectedMethod;

    const handlePerPageChange = (value) => {
        const newPerPage = Number(value);
        setPerPage(newPerPage);
        applyFilters({ per_page: newPerPage });
    };

    const handlePageChange = (url) => {
        if (url) {
            const urlObj = new URL(url, window.location.origin);
            // Preserve all current filters in pagination
            const params = buildParams();
            Object.keys(params).forEach((key) => {
                urlObj.searchParams.set(key, params[key]);
            });

            router.get(
                urlObj.pathname + urlObj.search,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }
    };

    const renderPageNumbers = () => {
        if (!histories) return [];
        const pages = [];
        const currentPage = histories.current_page;
        const lastPage = histories.last_page;

        if (lastPage <= 7) {
            for (let i = 1; i <= lastPage; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage > 3) {
                pages.push(1);
                if (currentPage > 4) {
                    pages.push("...");
                }
            }

            for (
                let i = Math.max(1, currentPage - 2);
                i <= Math.min(lastPage, currentPage + 2);
                i++
            ) {
                pages.push(i);
            }

            if (currentPage < lastPage - 2) {
                if (currentPage < lastPage - 3) {
                    pages.push("...");
                }
                pages.push(lastPage);
            }
        }

        return pages;
    };

    return (
        <OperatorLayout>
            <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-emerald-500 p-3 rounded-xl shadow-lg ring-4 ring-white/30">
                                <History className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                                    Kelola Riwayat Semua Pengguna
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    Riwayat perhitungan kualitas air dari semua pengguna
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Search & Filter Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
                        <div className="flex flex-col gap-4">
                            {/* Search Bar + Filter Toggle */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Cari nama stasiun, nama pengguna, atau email..."
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                    {search && (
                                        <button
                                            onClick={() => { setSearch(""); applyFilters({ search: "" }); }}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                        showFilters
                                            ? "bg-blue-500 text-white shadow-lg"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    <Filter className="w-4 h-4" />
                                    Filter
                                    {hasActiveFilters && !showFilters && (
                                        <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            !
                                        </span>
                                    )}
                                </button>
                                {hasActiveFilters && (
                                    <button
                                        onClick={handleReset}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                        Reset
                                    </button>
                                )}
                            </div>

                            {/* Filter Dropdowns */}
                            {showFilters && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-gray-100">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Zona Geografis</label>
                                        <select
                                            value={selectedGeoZone}
                                            onChange={(e) => handleFilterChange("geo_zone", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Semua Zona</option>
                                            {geoZones.map((zone) => (
                                                <option key={zone.id} value={zone.id}>
                                                    {zone.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Tipe Air</label>
                                        <select
                                            value={selectedWaterType}
                                            onChange={(e) => handleFilterChange("water_type", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Semua Tipe</option>
                                            {waterTypes.map((type) => (
                                                <option key={type.id} value={type.id}>
                                                    {type.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Status Kualitas</label>
                                        <select
                                            value={selectedStatus}
                                            onChange={(e) => handleFilterChange("status", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Semua Status</option>
                                            {statusOptions.map((s) => (
                                                <option key={s} value={s}>
                                                    {s}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Metode Kalkulasi</label>
                                        <select
                                            value={selectedMethod}
                                            onChange={(e) => handleFilterChange("method", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Semua Metode</option>
                                            {methodOptions.map((m) => (
                                                <option key={m} value={m}>
                                                    {m}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 p-1 rounded-xl shadow-lg ring-4 ring-white/30"></div>
                        
                        {/* Per Page Selector */}
                        <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-2 flex-wrap">
                                <label className="text-sm text-gray-700 font-medium">
                                    Tampilkan:
                                </label>
                                <select
                                    value={perPage}
                                    onChange={(e) => handlePerPageChange(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                <span className="text-sm text-gray-700">data per halaman</span>
                            </div>
                            <div className="text-sm text-gray-600 text-center w-full md:w-auto">
                                Menampilkan {histories?.from || 0} - {histories?.to || 0} dari {histories?.total || 0} data
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-auto max-h-[55vh] relative">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white relative sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">No</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Pengguna</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Station</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Geographical Zone</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Type of Location</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Method</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Value</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Status</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold whitespace-nowrap">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {histories?.data && histories.data.length > 0 ? (
                                        histories.data.map((history, index) => (
                                            <tr key={history.id} className="hover:bg-blue-50 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {histories.from + index}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                    {history.user?.name || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                    {history.station?.name || `Station ${history.id_station}`}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {history.station?.geo_zone?.name || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {history.station?.water_type?.name || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-blue-700 bg-blue-50/50">
                                                    {history.method || 'WSM'}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {history.value}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {history.status || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Link href={`/operator/kelola-station/${history.id}/result`} className="text-emerald-600 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 p-2 rounded-lg transition-colors flex items-center gap-2" title="Lihat Hasil">
                                                            <FaEye size={16} /> <span className="hidden xl:inline">Result</span>
                                                        </Link>
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                const printUrl = `/operator/kelola-station/${history.id}/result?print=1`;
                                                                const iframe = document.createElement('iframe');
                                                                iframe.style.display = 'none';
                                                                iframe.src = printUrl;
                                                                document.body.appendChild(iframe);
                                                                iframe.onload = function() {
                                                                    setTimeout(function() {
                                                                        iframe.contentWindow.focus();
                                                                        iframe.contentWindow.print();
                                                                        setTimeout(() => {
                                                                            document.body.removeChild(iframe);
                                                                        }, 10000);
                                                                    }, 1000);
                                                                };
                                                            }}
                                                            className="text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-200 p-2 rounded-lg transition-colors flex items-center gap-2"
                                                            title="Cetak Laporan"
                                                        >
                                                            <FaPrint size={16} /> <span className="hidden xl:inline">Print</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
                                                {hasActiveFilters
                                                    ? "Tidak ada data yang cocok dengan pencarian/filter."
                                                    : "Tidak ada data histori perhitungan."}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-sm text-gray-600 text-center w-full md:w-auto">
                                Halaman {histories?.current_page || 0} dari {histories?.last_page || 0}
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
                                <button
                                    onClick={() => handlePageChange(histories?.prev_page_url)}
                                    disabled={!histories?.prev_page_url}
                                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        histories?.prev_page_url
                                            ? "bg-blue-500 text-white hover:bg-blue-600"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Prev
                                </button>

                                <div className="flex items-center gap-1 hidden sm:flex">
                                    {renderPageNumbers().map((page, index) => {
                                        if (page === "...") {
                                            return (
                                                <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                                                    ...
                                                </span>
                                            );
                                        }

                                        const params = buildParams();
                                        params.page = page;
                                        const queryString = new URLSearchParams(params).toString();
                                        const pageUrl = `/operator/kelola-station?${queryString}`;

                                        return (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(pageUrl)}
                                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                    page === histories?.current_page
                                                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={() => handlePageChange(histories?.next_page_url)}
                                    disabled={!histories?.next_page_url}
                                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        histories?.next_page_url
                                            ? "bg-blue-500 text-white hover:bg-blue-600"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </OperatorLayout>
    );
}
