"use client";
import { useRouter } from "next/navigation";

export default function Obrigado() {
    const router = useRouter();

    return (
        <section className="h-screen w-full flex items-center justify-center bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12 text-center">
            <div className="mx-auto max-w-screen-md px-4 2xl:px-0">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Obrigado pela sua compra!
                </h2>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                    Sua compra foi realizada com sucesso. Em breve, você receberá um e-mail de confirmação.
                </p>
                <button
                    onClick={() => router.push("/")}
                    className="mt-8 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-800"
                >
                    Voltar à página inicial
                </button>
            </div>
        </section>
    );
}
