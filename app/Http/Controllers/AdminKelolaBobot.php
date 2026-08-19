<?php

namespace App\Http\Controllers;

use App\Models\GeoZone;
use App\Models\MainAbioticParameter;
use App\Models\AdditionalAbioticParameter;
use App\Models\WaterType;
use App\Models\BioticFamily;
use App\Models\Recommendation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminKelolaBobot extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $perPage = $request->input('per_page', 10);
        $allowedPerPage = [5, 10, 25, 50, 100];
        if (!in_array($perPage, $allowedPerPage)) {
            $perPage = 10;
        }

        $mainAbioticParameters = MainAbioticParameter::with([
            'geoZone:id,name',
            'waterType:id,name',
        ])
            ->orderBy('id')
            ->paginate($perPage)
            ->withQueryString();

        $additionalAbioticParameters = AdditionalAbioticParameter::orderBy('id')
            ->paginate($perPage)
            ->withQueryString();

        $bioticIndexParameters = \App\Models\BioticIndexParameter::orderBy('id')
            ->paginate($perPage)
            ->withQueryString();

        $bioticFamilies = BioticFamily::orderBy('id')
            ->paginate($perPage)
            ->withQueryString();

        $feedingTypes = \App\Models\FeedingType::orderBy('id')
            ->paginate($perPage)
            ->withQueryString();

        $recommendations = Recommendation::orderBy('id')->get();

        $geoZones = GeoZone::orderBy('name')->get(['id', 'name']);
        $waterTypes = WaterType::orderBy('name')->get(['id', 'name']);

        return Inertia::render("Admin/Kelola Bobot/page", [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'membership' => $user->is_membership,
                ]
            ],
            'mainAbioticParameters' => $mainAbioticParameters,
            'additionalAbioticParameters' => $additionalAbioticParameters,
            'bioticIndexParameters' => $bioticIndexParameters,
            'bioticFamilies' => $bioticFamilies,
            'feedingTypes' => $feedingTypes,
            'recommendations' => $recommendations,
            'geoZones' => $geoZones,
            'waterTypes' => $waterTypes,
        ]);
    }

    public function storeMainAbiotic(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'initial_value' => 'required|numeric',
            'final_value' => 'required|numeric',
            'weight' => 'required|numeric',
            'id_geo_zone' => 'required|exists:geo_zones,id',
            'id_type_water' => 'required|exists:water_types,id',
        ], [
            'name.required' => 'Nama parameter harus diisi',
            'initial_value.required' => 'Nilai awal harus diisi',
            'final_value.required' => 'Nilai akhir harus diisi',
            'weight.required' => 'Bobot harus diisi',
            'id_geo_zone.required' => 'Zona geografis harus dipilih',
            'id_geo_zone.exists' => 'Zona geografis tidak valid',
            'id_type_water.required' => 'Tipe air harus dipilih',
            'id_type_water.exists' => 'Tipe air tidak valid',
        ]);

        MainAbioticParameter::create($validated);

        return redirect()->back()->with('success', 'Parameter main abiotic berhasil ditambahkan');
    }

    public function updateMainAbiotic(Request $request, MainAbioticParameter $parameter)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'initial_value' => 'required|numeric',
            'final_value' => 'required|numeric',
            'weight' => 'required|numeric',
            'id_geo_zone' => 'required|exists:geo_zones,id',
            'id_type_water' => 'required|exists:water_types,id',
        ], [
            'name.required' => 'Nama parameter harus diisi',
            'initial_value.required' => 'Nilai awal harus diisi',
            'final_value.required' => 'Nilai akhir harus diisi',
            'weight.required' => 'Bobot harus diisi',
            'id_geo_zone.required' => 'Zona geografis harus dipilih',
            'id_geo_zone.exists' => 'Zona geografis tidak valid',
            'id_type_water.required' => 'Tipe air harus dipilih',
            'id_type_water.exists' => 'Tipe air tidak valid',
        ]);

        $parameter->update($validated);

        return redirect()->back()->with('success', 'Parameter main abiotic berhasil diupdate');
    }

    public function destroyMainAbiotic(MainAbioticParameter $parameter)
    {
        $parameter->delete();
        return redirect()->back()->with('success', 'Parameter main abiotic berhasil dihapus');
    }

    public function storeAdditionalAbiotic(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'initial_value' => 'required|numeric',
            'final_value' => 'required|numeric',
            'weight' => 'required|numeric',
        ], [
            'name.required' => 'Nama parameter harus diisi',
            'initial_value.required' => 'Nilai awal harus diisi',
            'final_value.required' => 'Nilai akhir harus diisi',
            'weight.required' => 'Bobot harus diisi',
        ]);

        AdditionalAbioticParameter::create($validated);

        return redirect()->back()->with('success', 'Parameter additional abiotic berhasil ditambahkan');
    }

    public function updateAdditionalAbiotic(Request $request, AdditionalAbioticParameter $parameter)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'initial_value' => 'required|numeric',
            'final_value' => 'required|numeric',
            'weight' => 'required|numeric',
        ], [
            'name.required' => 'Nama parameter harus diisi',
            'initial_value.required' => 'Nilai awal harus diisi',
            'final_value.required' => 'Nilai akhir harus diisi',
            'weight.required' => 'Bobot harus diisi',
        ]);

        $parameter->update($validated);

        return redirect()->back()->with('success', 'Parameter additional abiotic berhasil diupdate');
    }

    public function destroyAdditionalAbiotic(AdditionalAbioticParameter $parameter)
    {
        $parameter->delete();
        return redirect()->back()->with('success', 'Parameter additional abiotic berhasil dihapus');
    }

    public function storeBioticIndex(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'initial_value' => 'required|numeric',
            'final_value' => 'required|numeric',
            'weight' => 'required|numeric',
        ], [
            'name.required' => 'Nama parameter harus diisi',
            'initial_value.required' => 'Nilai awal harus diisi',
            'final_value.required' => 'Nilai akhir harus diisi',
            'weight.required' => 'Bobot harus diisi',
        ]);

        \App\Models\BioticIndexParameter::create($validated);

        return redirect()->back()->with('success', 'Parameter biotic index berhasil ditambahkan');
    }

    public function updateBioticIndex(Request $request, \App\Models\BioticIndexParameter $parameter)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'initial_value' => 'required|numeric',
            'final_value' => 'required|numeric',
            'weight' => 'required|numeric',
        ], [
            'name.required' => 'Nama parameter harus diisi',
            'initial_value.required' => 'Nilai awal harus diisi',
            'final_value.required' => 'Nilai akhir harus diisi',
            'weight.required' => 'Bobot harus diisi',
        ]);

        $parameter->update($validated);

        return redirect()->back()->with('success', 'Parameter biotic index berhasil diupdate');
    }

    public function destroyBioticIndex(\App\Models\BioticIndexParameter $parameter)
    {
        $parameter->delete();
        return redirect()->back()->with('success', 'Parameter biotic index berhasil dihapus');
    }

    public function storeFamilyBiotic(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'weight' => 'required|numeric',
        ], [
            'name.required' => 'Nama family harus diisi',
            'weight.required' => 'Bobot harus diisi',
        ]);

        \App\Models\BioticFamily::create($validated);

        return redirect()->back()->with('success', 'Family biotic berhasil ditambahkan');
    }

    public function updateFamilyBiotic(Request $request, \App\Models\BioticFamily $parameter)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'weight' => 'required|numeric',
        ], [
            'name.required' => 'Nama family harus diisi',
            'weight.required' => 'Bobot harus diisi',
        ]);

        $parameter->update($validated);

        return redirect()->back()->with('success', 'Family biotic berhasil diupdate');
    }

    public function destroyFamilyBiotic(\App\Models\BioticFamily $parameter)
    {
        $parameter->delete();
        return redirect()->back()->with('success', 'Family biotic berhasil dihapus');
    }

    public function storeFeedingType(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:255|unique:feeding_types,code',
            'name' => 'required|string|max:255',
            'weight' => 'required|numeric',
        ], [
            'code.required' => 'Kode feeding type harus diisi',
            'code.unique' => 'Kode feeding type sudah digunakan',
            'name.required' => 'Nama feeding type harus diisi',
            'weight.required' => 'Bobot harus diisi',
        ]);

        \App\Models\FeedingType::create($validated);

        return redirect()->back()->with('success', 'Feeding type berhasil ditambahkan');
    }

    public function updateFeedingType(Request $request, \App\Models\FeedingType $parameter)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:255|unique:feeding_types,code,' . $parameter->id,
            'name' => 'required|string|max:255',
            'weight' => 'required|numeric',
        ], [
            'code.required' => 'Kode feeding type harus diisi',
            'code.unique' => 'Kode feeding type sudah digunakan',
            'name.required' => 'Nama feeding type harus diisi',
            'weight.required' => 'Bobot harus diisi',
        ]);

        $parameter->update($validated);

        return redirect()->back()->with('success', 'Feeding type berhasil diupdate');
    }

    public function destroyFeedingType(\App\Models\FeedingType $parameter)
    {
        $parameter->delete();
        return redirect()->back()->with('success', 'Feeding type berhasil dihapus');
    }

    public function updateRecommendation(Request $request, Recommendation $recommendation)
    {
        $validated = $request->validate([
            'conclusion' => 'required|string',
            'recommendation' => 'required|string',
        ], [
            'conclusion.required' => 'Teks kesimpulan harus diisi',
            'recommendation.required' => 'Teks rekomendasi harus diisi',
        ]);

        $recommendation->update($validated);

        return redirect()->back()->with('success', 'Rekomendasi berhasil diupdate');
    }
}
