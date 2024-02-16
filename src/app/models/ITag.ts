export interface ITag {
    id?: number;
    category?: string;
    name?: string;
    class?: string;
    default?: boolean | string | number;
    active?: boolean | string | number;
    project_id?: number,
    return_all?: boolean
    return_category?: string;
}