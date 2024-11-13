"use client";
import Inicio from "./pages/inicio/page";
import GlobalContext from "@/context/GlobalContext";

export default function Home() {
    return (
        <GlobalContext>
            <Inicio />
        </GlobalContext>
    );
}
