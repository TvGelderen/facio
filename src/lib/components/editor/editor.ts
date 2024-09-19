import { type AddElementAction, type DeleteElementAction, type EditorElement, type UpdateElementAction } from "./types";

export function addElement(elements: EditorElement[], action: AddElementAction): EditorElement[] {
    return elements.map((item) => {
        if (item.id === action.parentId && Array.isArray(item.content)) {
            return {
                ...item,
                content: [...item.content, action.element],
            };
        } else if (item.content && Array.isArray(item.content)) {
            return {
                ...item,
                content: addElement(item.content, action),
            };
        }
        return item;
    })
}

export function updateElement(elements: EditorElement[], action: UpdateElementAction): EditorElement[] {
    return elements.map((item) => {
        if (item.id === action.element.id) {
            return {
                ...item,
                ...action.element
            };
        } else if (item.content && Array.isArray(item.content)) {
            return {
                ...item,
                content: updateElement(item.content, action),
            };
        }
        return item;
    })
}

export function deleteElement(elements: EditorElement[], action: DeleteElementAction): EditorElement[] {
    return elements.filter((item) => {
        if (item.id === action.element.id) {
            return false;
        }
        if (item.content && Array.isArray(item.content)) {
            item.content = deleteElement(item.content, action);
        }
        return true;
    })
}
