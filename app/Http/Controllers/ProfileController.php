<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Image;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function uploadImage(Request $request)
    {
        $this->middleware('auth');

        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // $user_id = auth()->id(); // Mendapatkan ID pengguna yang sedang masuk

        $image = $request->file('image');
        $imageName = time() . '.' . $image->extension();
        $finalName = $request->file('image')->storeAs('images', $imageName, 'public');
        $image->move(public_path('images'), $imageName);
        $user = auth()->user();

        if ($user) {
            $user = $request->user();

            $user_id = Auth::id();

            Image::create([
                'user_id' => $user_id,
                'image' => $finalName,

            ]);

            return response()->json(['success' => 'Image uploaded successfully']);
        } else {
            return response()->json(['error' => 'User not authenticated']);
        }

        // Image::create([
        //     'user_id' => $user_id,
        //     'image' => $imageName,
        // ]);

        // return response()->json(['success' => 'Image uploaded successfully']);
    }

    // $request->validate([
    //     'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    // ]);

    // if ($request->hasFile('image')) {
    //     $file = $request->file('image');
    //     $extension = $file->getClientOriginalExtension();
    //     $user_id = auth()->id();

    //     $fileName = time() . '.' . $extension;

    //     $request->file('image')->storeAs('images/', $fileName, 'public');

    //     $path = '/storage/images/';
    //     $file->move($path, $fileName);

    //     Image::create([
    //         'user_id' => $user_id,
    //         'image' => $path . $fileName,
    //     ]);
    // }

    // return redirect('/profile')->with("status", "sukses");

    // if ($request->hasFile('image')) {
    //     $file = $request->file('image');
    //     $filename = $file->getClientOriginalName();
    //     $finalName = date('His') . $filename;

    //     $request->file('image')->storeAs('images/', $finalName, 'public');
    //     return response()->json(["message" => "sukses"]);
    // } else {
    //     return response()->json(["message" => "gagal"]);
    // }
    // }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
