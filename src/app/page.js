"use client";
import Inicio from "./inicio/page";
import GlobalContext from "@/context/GlobalContext";

export default function Home() {
    return (
        <GlobalContext>
            <Inicio />
        </GlobalContext>
    );
}
