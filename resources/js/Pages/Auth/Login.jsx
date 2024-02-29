import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import { useState } from "react";
import LayoutLogin from "@/Layouts/LayoutLogin";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Register from "./Register";
import { saveTokenToLocalStorage } from "@/services/AuthService";

export default function Login({ status, canResetPassword }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        // pengecekan untuk menentukan peran berdasarkan email atau atribut lain
        const role = email === "admin@example.com" ? "admin" : "user";

        post(route("login"), {
            email,
            password,
            remember,
            role,
        });
    };

    return (
        <LayoutLogin>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <h1 className="flex justify-center py-4 items-center text-2xl">
                Masuk
            </h1>

            <form onSubmit={submit}>
                <div className="ml-4">
                    <InputLabel
                        className="mb-[5px]"
                        htmlFor="email"
                        value="Email"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-[350px]"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-5 ml-4">
                    <InputLabel
                        className="mb-[5px]"
                        htmlFor="password"
                        value="Password"
                    />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-[350px]"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="hidden">
                    <p>
                        Role: {email === "admin@example.com" ? "Admin" : "User"}
                    </p>
                </div>

                {/* <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div> */}

                <div className="flex items-center justify-end mr-9 mt-4">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Lupa Password?
                        </Link>
                    )}
                </div>
                <div>
                    <PrimaryButton
                        className="mt-6 ml-4 w-[350px] bg-blue-600 text-white"
                        disabled={processing}
                    >
                        Masuk
                    </PrimaryButton>
                </div>
                <div className="mt-3 ml-4">
                    <p>
                        Belum memiliki akun?{" "}
                        <Link
                            href={route("register")}
                            className="underline text-blue-600"
                        >
                            Daftar
                        </Link>
                    </p>
                </div>
            </form>
        </LayoutLogin>
    );
}
