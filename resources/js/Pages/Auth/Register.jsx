import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        username: "",
        alamat: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout className="w-[850px]">
            <Head title="Register" />

            <h1 className="flex justify-center py-5 items-center text-2xl">
                Daftarkan Akun Anda
            </h1>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="nama" value="Nama" />

                    <TextInput
                        id="nama"
                        name="nama"
                        value={data.nama}
                        className="mt-1 block w-full"
                        autoComplete="nama"
                        isFocused={true}
                        onChange={(e) => setData("nama", e.target.value)}
                        required
                    />

                    <InputError message={errors.nama} className="mt-2" />
                </div>

                <div className="mt-2">
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setData("username", e.target.value)}
                        required
                    />

                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div className="mt-2">
                    <InputLabel htmlFor="alamat" value="Alamat" />

                    <TextInput
                        id="alamat"
                        name="alamat"
                        value={data.alamat}
                        className="mt-1 block w-full"
                        autoComplete="alamat"
                        onChange={(e) => setData("alamat", e.target.value)}
                        required
                    />

                    <InputError message={errors.alamat} className="mt-2" />
                </div>

                <div className="mt-2">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-2">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-2">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <h1>
                        Sudah memiliki akun?{" "}
                        <Link
                            href={route("login")}
                            className="underline text-sm text-blue-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Masuk
                        </Link>
                    </h1>
                    <PrimaryButton
                        className="ms-4 bg-blue-600 text-white"
                        type="submit"
                    >
                        Daftar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
