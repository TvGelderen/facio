import type * as CSS from "csstype";

export type EditorElement = {
    id: string;
    parentId: string;
    name: string;
    type: ElementType;
    styles: CSS.Properties;
    content: EditorElement[] | { href?: string, innerText?: string };
}

export type EditorEvent = {
    redo: EditorAction;
    undo: EditorAction;
}

export enum ElementType {
    Body = '__body',
    Container = 'container',
    Text = 'text',
    Link = 'link',
    Image = 'image',
};

export enum Device {
    Desktop = 'Desktop',
    Mobile = 'Mobile',
    Tablet = 'Tablet',
}

export enum EditorActionType {
    AddElement = 'ADD_ELEMENT',
    InsertElement = 'INSERT_ELEMENT',
    UpdateElement = 'UPDATE_ELEMENT',
    DeleteElement = 'DELETE_ELEMENT',
    UpdateSelectedElement = 'UPDATE_SELECTED_ELEMENT',
    ChangeDevice = 'CHANGE_DEVICE',
    Undo = 'UNDO',
    Redo = 'REDO',
    LoadData = 'LOAD_DATA',
    TogglePreviewMode = 'TOGGLE_PREVIEW_MODE',
}

export type EditorAction =
    | AddElementAction
    | InsertElementAction
    | UpdateElementAction
    | DeleteElementAction
    | UpdateSelectedElementAction
    | ChangeDeviceAction
    | UndoAction
    | RedoAction
    | ToggleLiveModeAction;

export type AddElementAction = {
    type: EditorActionType.AddElement;
    parentId: string;
    element: EditorElement;
}

export type InsertElementAction = {
    type: EditorActionType.InsertElement;
    element: EditorElement;
    parentId: string;
    index?: number;
    previousParentId: string;
    previousIndex: number | undefined;
}

export type UpdateElementAction = {
    type: EditorActionType.UpdateElement;
    element: EditorElement;
}

export type DeleteElementAction = {
    type: EditorActionType.DeleteElement;
    parentId: string;
    element: EditorElement;
}

export type UpdateSelectedElementAction = {
    type: EditorActionType.UpdateSelectedElement;
    element: EditorElement | null;
}

export type ChangeDeviceAction = {
    type: EditorActionType.ChangeDevice;
    device: Device;
}

export type UndoAction = {
    type: EditorActionType.Undo;
}

export type RedoAction = {
    type: EditorActionType.Redo;
}

export type ToggleLiveModeAction = {
    type: EditorActionType.TogglePreviewMode;
}
