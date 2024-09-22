import { getContext, setContext, tick } from "svelte";
import { addElement, deleteElement, insertElementBefore, insertElementInto, updateElement } from "./editor";
import { Device, EditorActionType, ElementType, type EditorAction, type EditorElement, type EditorState } from "./types";

export function createEditor() {
    let elements = $state<EditorElement[]>([
        {
            id: "__body",
            parentId: "",
            name: "Body",
            type: ElementType.Body,
            styles: {
                background: "#ffffff",
            },
            content: [],
        },
    ]);
    let selectedElement = $state<EditorElement | null>(null);
    let dragging = $state(false);
    let device = $state<Device>(Device.Desktop);
    let preview = $state<boolean>(false);
    let live = $state<boolean>(false);
    let history = $state<EditorState[]>([]);
    let historyIndex = $state<number>(0);

    // Private
    let draggedElement = $state<EditorElement | null>(null);
    let draggedElementRef = $state<HTMLElement | null>(null);
    let dropTarget = $state<EditorElement | null>(null);
    let dropTargetRef = $state<HTMLElement | null>(null);

    function handleAction(action: EditorAction) {
        console.log(action);

        switch (action.type) {
            case EditorActionType.AddElement:
                elements = addElement(elements, action.element, action.parentId);
                break;
            case EditorActionType.UpdateElement:
                elements = updateElement(elements, action.element);
                break;
            case EditorActionType.DeleteElement:
                elements = deleteElement(elements, action.element);
                if (selectedElement?.id === action.element.id) {
                    selectedElement = null;
                }
                break;
            case EditorActionType.UpdateSelectedElement:
                if (selectedElement === action.element) {
                    return;
                }
                selectedElement = action.element;
                break;
            case EditorActionType.ChangeDevice:
                device = action.device;
                break;
            case EditorActionType.Undo:
                if (historyIndex > 0) {
                    historyIndex--;

                    const state = history[historyIndex];

                    elements = state.elements;
                    selectedElement = state.selectedElement;
                    device = state.device;
                }
                break;
            case EditorActionType.Redo:
                if (history.length > historyIndex) {
                    historyIndex++;

                    const state = history[historyIndex];

                    elements = state.elements;
                    selectedElement = state.selectedElement;
                    device = state.device;
                }
                break;
        }

        // INFO: This might cause an issue
        history = [...history.slice(0, historyIndex + 1), getState()];
        historyIndex++;
    }

    function handleDragStart(event: DragEvent, element: EditorElement, reference: HTMLElement) {
        event.stopPropagation();

        selectedElement = null;
        dragging = true;
        draggedElement = element;
        draggedElementRef = reference;
        draggedElementRef.dataset.state = "dragged";
    }

    function handleDragOver(event: DragEvent, element: EditorElement, reference: HTMLElement) {
        event.preventDefault();
        if (draggedElement === null || draggedElementRef === null || draggedElementRef.contains(reference) || !isValidDropTarget(element.type)) {
            return;
        }

        event.stopPropagation();

        if (dropTarget !== element) {
            dropTarget = element;
            dropTargetRef = reference;
        }

        if (dropTarget === null || dropTargetRef === null) {
            return;
        }

        const children = dropTargetRef.querySelectorAll(":scope>*:not(.absolute)");
        if (children.length === 0) {
            dropTargetRef.appendChild(draggedElementRef);
            return;
        }

        for (const child of children) {
            if (child === draggedElementRef) {
                continue;
            }

            const rect = child.getBoundingClientRect();
            if (child.previousElementSibling === null) {
                if (child.nextElementSibling !== null) {
                    const nextRect = child.nextElementSibling.getBoundingClientRect();
                    const vertical = rect.bottom <= nextRect.top;
                    if (isAbove(rect, vertical, event.clientX, event.clientY)) {
                        dropTargetRef.insertBefore(draggedElementRef, child);
                        return;
                    }
                } else {
                    dropTargetRef.appendChild(draggedElementRef);
                    return;
                }
            }

            if (child.nextElementSibling !== null) {
                if (child.nextElementSibling === draggedElementRef) {
                    continue;
                }
                if (isBetween(rect, child.nextElementSibling.getBoundingClientRect(), event.clientX, event.clientY)) {
                    dropTargetRef.insertBefore(draggedElementRef, child.nextElementSibling);
                    return;
                }
                continue;
            }

            if (child.previousElementSibling !== null) {
                const prevRect = child.previousElementSibling.getBoundingClientRect();
                const vertical = prevRect.bottom <= rect.top;
                if (isBelow(rect, vertical, event.clientX, event.clientY)) {
                    dropTargetRef.appendChild(draggedElementRef);
                    return;
                }
            }
        }
    }

    async function handleDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();

        if (draggedElement === null || draggedElementRef === null || dropTarget === null || dropTargetRef === null) {
            return;
        }

        draggedElement.parentId = dropTarget.id;

        if (draggedElementRef.nextElementSibling !== null && Array.isArray(dropTarget.content)) {
            const sibling = dropTarget.content.find(el => el.id === draggedElementRef!.nextElementSibling!.id);
            if (sibling !== undefined) {
                elements = insertElementBefore(deleteElement(elements, draggedElement), draggedElement, sibling);
            }
        } else {
            elements = insertElementInto(deleteElement(elements, draggedElement), draggedElement, dropTarget);
        }

        await tick();

        let remove = false;
        for (const child of dropTargetRef.children) {
            if (child.id === draggedElement.id) {
                console.log(child)
                if (remove) {
                    child.remove();
                } else {
                    remove = true;
                }
            }
        }

        dropTarget = null;
        dropTargetRef = null;
        dragging = false;
    }

    function isAbove(rect: DOMRect, vertical: boolean, x: number, y: number) {
        const X = rect.left + Math.min(rect.width / 2, 8);
        const Y = rect.top + Math.min(rect.height / 2, 8);
        return (vertical && Y > y) || (!vertical && X > x);
    }

    function isBelow(rect: DOMRect, vertical: boolean, x: number, y: number) {
        const X = rect.right - Math.min(rect.width / 2, 8);
        const Y = rect.bottom - Math.min(rect.height / 2, 8);
        return (vertical && Y < y) || (!vertical && X < x);
    }

    // Assumes that rect1 comes before rect2
    function isBetween(rect1: DOMRect, rect2: DOMRect, x: number, y: number) {
        const X1 = rect1.right - Math.min(rect1.width / 2, 8);
        const Y1 = rect1.bottom - Math.min(rect1.height / 2, 8);
        const X2 = rect2.left + Math.min(rect2.width / 2, 8);
        const Y2 = rect2.top + Math.min(rect2.height / 2, 8);

        // If they are oriented vertically
        if (rect1.bottom <= rect2.top) {
            return Y1 < y && Y2 > y;
        }
        return X1 < x && X2 > x;
    }

    function isValidDropTarget(type: ElementType) {
        return type === ElementType.Body || type === ElementType.Container;
    }

    const toggleView = () => {
        preview = !preview
        live = !live
    };
    const undo = () => handleAction({ type: EditorActionType.Undo });
    const redo = () => handleAction({ type: EditorActionType.Redo });

    function changeDevice(device: Device) {
        return handleAction({
            type: EditorActionType.ChangeDevice,
            device,
        });
    }

    function getState(): EditorState {
        return {
            elements: elements,
            selectedElement: selectedElement,
            device: device,
            preview: preview,
        };
    }

    function saveState(pageId: string) {
        return fetch(`/api/page/${pageId}`, {
            method: "POST",
            body: JSON.stringify({ elements }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    return {
        get elements() { return elements },
        set elements(value: EditorElement[]) { elements = value },
        get selectedElement() { return selectedElement },
        set selectedElement(value: EditorElement | null) { selectedElement = value },
        get dragging() { return dragging; },
        set dragging(value: boolean) { dragging = value },
        get device() { return device },
        set device(value: Device) { device = value },
        get preview() { return preview },
        set preview(value: boolean) { preview = value },
        get live() { return live },
        set live(value: boolean) { live = value },
        get history() { return history },
        set history(value: EditorState[]) { history = value },
        get historyIndex() { return historyIndex },
        set historyIndex(value: number) { historyIndex = value },
        handleAction,
        handleDragStart,
        handleDragOver,
        handleDrop,
        toggleView,
        undo,
        redo,
        changeDevice,
        getState,
        saveState,
    }
}

const EDITOR = Symbol("EDITOR");

export function setEditorState() {
    return setContext(EDITOR, createEditor())
}

export function getEditorState() {
    return getContext<ReturnType<typeof setEditorState>>(EDITOR);
}
