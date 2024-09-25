import { generateIdFromEntropySize } from "lucia";
import { EditorActionType, ElementType, type EditorAction, type EditorElement } from "../types";

export function handleDeleteElement(event: Event, handleAction: (action: EditorAction) => void, element: EditorElement) {
    event.preventDefault();
    event.stopPropagation();

    handleAction({
        type: EditorActionType.DeleteElement,
        parentId: element.parentId,
        element: element,
    });
}

export function handleSelectElement(event: Event, handleAction: (action: EditorAction) => void, element: EditorElement) {
    event.preventDefault();
    event.stopPropagation();

    handleAction({
        type: EditorActionType.UpdateSelectedElement,
        element: element
    })
}

export function newTextElement(parentId: string) {
    return {
        id: id(),
        parentId: parentId,
        type: ElementType.Text,
        name: "Text",
        styles: {
            background: "transparent",
            color: "#101010",
            display: "block",
        },
        content: {
            innerText: "Text"
        }
    };
}

export function newLinkElement(parentId: string) {
    return {
        id: id(),
        parentId: parentId,
        type: ElementType.Link,
        name: "Link",
        styles: {
            background: "transparent",
            color: "#101010",
            display: "block",
        },
        content: {
            innerText: "Link",
            href: "#"
        }
    };
}

export function newContainerElement(parentId: string) {
    return {
        id: id(),
        parentId: parentId,
        type: ElementType.Container,
        name: "Container",
        styles: {
            background: "transparent",
            paddingLeft: "4px",
            paddingTop: "4px",
            paddingRight: "4px",
            paddingBottom: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        content: []
    };
}

const id = () => generateIdFromEntropySize(12);
