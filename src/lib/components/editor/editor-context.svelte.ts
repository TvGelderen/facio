import { getContext, setContext } from "svelte";
import { Device, EditorActionType, ElementType, type EditorAction, type EditorElement, type EditorState } from "./types";
import { addElement, deleteElement, insertElementBefore, updateElement } from "./editor";

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
        selectedElement = null;
        dragging = true;
        draggedElement = element;
        draggedElementRef = reference;
    }

    function handleDragOver(event: DragEvent, element: EditorElement, reference: HTMLElement) {
        event.preventDefault();

        if (draggedElement === null) {
            return;
        }

        if (dropTarget !== element) {
            dropTarget = element;
            dropTargetRef = reference;
        }

        if (draggedElementRef === null || dropTarget === null || dropTargetRef === null) {
            return;
        }

        const children = dropTargetRef.querySelectorAll(":scope>*:not(.absolute)");
        for (const child of children) {
            if (child === draggedElementRef) {
                continue;
            }

            const rect = child.getBoundingClientRect();
            const middleX = rect.left + rect.width / 2;
            const middleY = rect.top + rect.height / 2;

            if (child.previousElementSibling === null) {
                if (child.nextElementSibling !== null) {
                    const nextRect = child.nextElementSibling.getBoundingClientRect();
                    const vertical = rect.bottom <= nextRect.top;
                    if ((vertical && middleY > event.clientY) || (!vertical && middleX > event.clientX)) {
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
                if ((vertical && middleY < event.clientY) || (!vertical && middleX < event.clientX)) {
                    dropTargetRef.appendChild(draggedElementRef);
                    return;
                }
            }
        }
    }

    // Assumes that rect1 comes before rect2
    function isBetween(rect1: DOMRect, rect2: DOMRect, x: number, y: number) {
        const middleX1 = rect1.left + rect1.width / 2;
        const middleX2 = rect2.left + rect2.width / 2;
        const middleY1 = rect1.top + rect1.height / 2;
        const middleY2 = rect2.top + rect2.height / 2;

        // If the are oriented vertically
        if (rect1.bottom <= rect2.top) {
            return middleY1 < y && middleY2 > y;
        }
        return middleX1 < x && middleX2 > x;
    }

    function handleDrop(event: DragEvent, element: EditorElement) {
        event.stopPropagation();

        if (draggedElement === null) {
            return;
        }

        insertElementBefore(deleteElement(elements, draggedElement), draggedElement, element);

        dropTarget = null;
        dropTargetRef = null;
        dragging = false;
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
    }
}

const EDITOR = Symbol("EDITOR");

export function setEditorState() {
    return setContext(EDITOR, createEditor())
}

export function getEditorState() {
    return getContext<ReturnType<typeof setEditorState>>(EDITOR);
}
