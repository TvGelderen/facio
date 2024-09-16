import { getContext, setContext } from "svelte";
import { Device, EditorActionType, ElementType, type EditorAction, type EditorElement, type EditorState } from "./types";
import { addElement, deleteElement, updateElement } from "./editor";

export function createEditor() {
    let elements = $state<EditorElement[]>([
        {
            id: "__body",
            name: "Body",
            type: ElementType.Body,
            styles: {},
            content: [],
        },
    ]);
    let selectedElement = $state<EditorElement | null>(null);
    let device = $state<Device>(Device.Desktop);
    let preview = $state<boolean>(false);
    let history = $state<EditorState[]>([]);
    let historyIndex = $state<number>(0);

    function handleAction(action: EditorAction) {
        console.log(action);

        switch (action.type) {
            case EditorActionType.AddElement:
                elements = addElement(elements, action);
                break;
            case EditorActionType.UpdateElement:
                elements = updateElement(elements, action);
                break;
            case EditorActionType.DeleteElement:
                elements = deleteElement(elements, action);
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

    const togglePreview = () => (preview = !preview);
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
        get device() { return device },
        set device(value: Device) { device = value },
        get preview() { return preview },
        set preview(value: boolean) { preview = value },
        get history() { return history },
        set history(value: EditorState[]) { history = value },
        get historyIndex() { return historyIndex },
        set historyIndex(value: number) { historyIndex = value },
        handleAction,
        togglePreview,
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
