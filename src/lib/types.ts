import type { EditorElement } from "./components/editor/types";

export type WebsiteRecord = {
    id: string;
    userId: string;
    name: string;
    description: string;
    logo: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type PageRecord = {
    id: string;
    name: string;
    path: string;
    createdAt: Date;
    updatedAt: Date;
}

export type PageLayoutRecord = {
    id: number;
    elements: EditorElement[];
    createdAt: Date;
    updatedAt: Date;
}

export type Website = WebsiteRecord & {
    pages: PageRecord[];
}

export type Page = PageRecord & {
    website: WebsiteRecord;
    pageLayout: PageLayoutRecord | null;
}
