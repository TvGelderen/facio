import { generateIdFromEntropySize } from "lucia";
import { EditorActionType, ElementType, type EditorAction, type EditorElement } from "../types";

export function handleDeleteElement(handleAction: (action: EditorAction) => void, element: EditorElement) {
    handleAction({
        type: EditorActionType.DeleteElement,
        parentId: element.parentId,
        element: element,
    });
}

export function handleSelectElement(event: Event, handleAction: (action: EditorAction) => void, element: EditorElement) {
    event.stopPropagation();
    handleAction({
        type: EditorActionType.UpdateSelectedElement,
        element: element
    })
}

export function newTextElement(parentId: string) {
    return {
        id: generateIdFromEntropySize(12),
        parentId: parentId,
        type: ElementType.Text,
        name: "Text",
        styles: {
            color: "black",
        },
        content: {
            innerText: "Text"
        }
    };
}

export function newLinkElement(parentId: string) {
    return {
        id: generateIdFromEntropySize(12),
        parentId: parentId,
        type: ElementType.Link,
        name: "Link",
        styles: {
            color: "black",
        },
        content: {
            innerText: "Text",
            href: "#"
        }
    };
}

export function newContainerElement(parentId: string) {
    return {
        id: generateIdFromEntropySize(12),
        parentId: parentId,
        type: ElementType.Container,
        name: "Container",
        styles: {},
        content: []
    };
}
