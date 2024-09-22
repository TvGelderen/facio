import type { EditorElement } from "./types";

export function addElement(elements: EditorElement[], element: EditorElement, parentId: string): EditorElement[] {
    return elements.map((item) => {
        if (Array.isArray(item.content)) {
            if (item.id === parentId) {
                item.content.push(element);
                return item;
            }
            item.content = addElement(item.content, element, parentId);
        }
        return item;
    });
}

export function insertElementBefore(elements: EditorElement[], element: EditorElement, reference: EditorElement): EditorElement[] {
    return elements.map(item => {
        if (Array.isArray(item.content)) {
            if (item.id === reference.parentId) {
                const referenceIndex = item.content.indexOf(reference);
                item.content.splice(referenceIndex, 0, element);
                return item;
            }
            item.content = insertElementBefore(item.content, element, reference);
        }
        return item;
    });
}

export function insertElementInto(elements: EditorElement[], element: EditorElement, reference: EditorElement): EditorElement[] {
    return elements.map(item => {
        if (Array.isArray(item.content)) {
            if (item.id === reference.id && Array.isArray(item.content)) {
                item.content.push(element);
                return item;
            }
            item.content = insertElementInto(item.content, element, reference);
        }
        return item;
    });
}

export function updateElement(elements: EditorElement[], element: EditorElement): EditorElement[] {
    return elements.map((item) => {
        if (item.id === element.id) {
            return element;
        }
        if (Array.isArray(item.content)) {
            item.content = updateElement(item.content, element);
        }
        return item;
    });
}

export function deleteElement(elements: EditorElement[], element: EditorElement): EditorElement[] {
    return elements.filter((item) => {
        if (item.id === element.id) {
            return false;
        }
        if (Array.isArray(item.content)) {
            item.content = deleteElement(item.content, element);
        }
        return true;
    });
}
