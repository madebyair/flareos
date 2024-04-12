import React from "react"

export type Widget = {
    name: string,
    component: React.ReactElement,
    x: number,
    y: number,
    default?: string
}