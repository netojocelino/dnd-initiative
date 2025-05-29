export type Player = {
    player: boolean
    name: string
    initiative: number
    class_armor: number
    health_points: number
    conditions: {
        id: number
        name: string
        checked: boolean
    }[]
}

export type PlayerState = {
    id: number
    name: string
}

export type PlayerCondition = {
    id: number,
    name?: string,
    checked: boolean,
}
