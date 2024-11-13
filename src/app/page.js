"use client";
import GlobalContext from "@/context/GlobalContext";
import Inicio from "./pages/inicio/page";

export default function Home() {
    return (
        <GlobalContext>
            <Inicio />
        </GlobalContext>
    );
}
