import type { EditorElement } from "./types";

export function addElement(elements: EditorElement[], element: EditorElement, parentId: string): EditorElement[] {
    return elements.map((item) => {
        if (Array.isArray(item.content)) {
            if (item.id === parentId) {
                return {
                    ...item,
                    content: [...item.content, element]
                }
            }
            item.content = addElement(item.content, element, parentId);
        }
        return item;
    });
}

export function insertElement(elements: EditorElement[], element: EditorElement, parentId: string, index?: number): EditorElement[] {
    element.parentId = parentId;

    return elements.map(item => {
        if (Array.isArray(item.content)) {
            if (item.id === parentId) {
                if (index) {
                    return {
                        ...item,
                        content: item.content.toSpliced(index, 0, element)
                    }
                }
                return {
                    ...item,
                    content: [...item.content, element]
                }
            }
            item.content = insertElement(item.content, element, parentId, index);
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

export function getElementById(elements: EditorElement[], id: string): EditorElement | undefined {
    const element = elements.find(el => el.id === id);
    if (element) {
        return element;
    }

    for (const el of elements) {
        if (Array.isArray(el.content)) {
            const element = getElementById(el.content, id);
            if (element) {
                return element;
            }
        }
    }
}

export function insertElementDOM(id: string, parentId: string, index: number | undefined) {
    const element = document.getElementById(id);
    const parent = document.getElementById(parentId);
    if (element === null || parent === null) {
        return;
    }

    if (index !== undefined) {
        console.log(parent.querySelectorAll(":scope>*")[index])
        parent.insertBefore(element, parent.querySelectorAll(":scope>*")[index]);
        return;
    }

    parent?.appendChild(element);
}
