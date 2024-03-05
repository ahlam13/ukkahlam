<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        DB::table('users')->insert([
            'nama' => 'Ahlam Radith',
            'username' => 'ahlam13',
            'alamat' => 'Pancurbatu',
            'email' => 'violet@gmail.com',
            'password' => Hash::make('123456789'),
        ]);

        DB::table('users')->insert([
            'nama' => 'petugas',
            'username' => 'petugas',
            'role' => 'petugas',
            'email' => 'petugas@gmail.com',
            'password' => Hash::make('petugas123'),
        ]);

        DB::table('users')->insert([
            'nama' => 'admin',
            'username' => 'admin',
            'role' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin123'),
        ]);
    }
}
