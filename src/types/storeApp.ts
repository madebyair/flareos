export type storeApp = {
    uuid: string,
    name: string,
    source: string,
    source_id: string,
    latest_version: string,
    screenshots: Array<string>,
    urls: Array<string>,
    icon: string,
    description: string,
    short: string,
    categories: Array<string>,
    free_license: boolean,
    is_amd: boolean,
    is_arm: boolean
}