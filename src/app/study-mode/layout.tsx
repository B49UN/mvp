import {Menu} from "../../../components/menu";
import React from "react";

export default function StudyLayout({ children }: Readonly<{children: React.ReactNode;}>) {

    return (
        <div>
            {children}
        </div>
    )
}