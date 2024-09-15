import {
    Device, EditorActionType, ElementType, type AddElementAction,
    type DeleteElementAction,
    type EditorAction,
    type EditorElement,
    type EditorState,
    type UpdateElementAction
} from "./types";

export class Editor {
    elements: EditorElement[];
    selectedElement: EditorElement | null;
    device: Device;
    history: EditorState[];
    historyIndex: number;

    constructor() {
        this.elements = [{
            id: '__body',
            name: 'Body',
            type: ElementType.Body,
            styles: {},
            content: [],
        }];
        this.selectedElement = null;
        this.device = Device.Desktop;
        this.history = [this.getState()];
        this.historyIndex = 0;
    }

    handleAction(action: EditorAction) {
        console.log(action);

        switch (action.type) {
            case EditorActionType.AddElement:
                this.elements = this.addElement(this.elements, action);
                break;
            case EditorActionType.UpdateElement:
                this.elements = this.updateElement(this.elements, action);
                break;
            case EditorActionType.DeleteElement:
                this.elements = this.deleteElement(this.elements, action);
                if (this.selectedElement?.id === action.element.id) {
                    this.selectedElement = null;
                }
                break;
            case EditorActionType.UpdateSelectedElement:
                this.selectedElement = action.element;
                break;
            case EditorActionType.ChangeDevice:
                this.device = action.device;
                break;
            case EditorActionType.Undo:
                if (this.historyIndex > 0) {
                    this.historyIndex--;

                    const state = this.history[this.historyIndex];

                    this.elements = state.elements;
                    this.selectedElement = state.selectedElement;
                    this.device = state.device
                }
                break;
            case EditorActionType.Redo:
                if (this.history.length > this.historyIndex) {
                    this.historyIndex++;

                    const state = this.history[this.historyIndex];

                    this.elements = state.elements;
                    this.selectedElement = state.selectedElement;
                    this.device = state.device
                }
                break;
        }

        // INFO: This might cause an issue
        this.history = [
            ...this.history.slice(0, this.historyIndex + 1),
            this.getState()
        ];
        this.historyIndex++;
    }

    private addElement(elements: EditorElement[], action: AddElementAction): EditorElement[] {
        return elements.map((item) => {
            if (item.id === action.parentId && Array.isArray(item.content)) {
                return {
                    ...item,
                    content: [...item.content, action.element],
                };
            } else if (item.content && Array.isArray(item.content)) {
                return {
                    ...item,
                    content: this.addElement(item.content, action),
                };
            }
            return item;
        })
    }

    private updateElement(elements: EditorElement[], action: UpdateElementAction): EditorElement[] {
        return elements.map((item) => {
            if (item.id === action.element.id) {
                return {
                    ...item,
                    ...action.element
                };
            } else if (item.content && Array.isArray(item.content)) {
                return {
                    ...item,
                    content: this.updateElement(item.content, action),
                };
            }
            return item;
        })
    }

    private deleteElement(elements: EditorElement[], action: DeleteElementAction): EditorElement[] {
        return elements.filter((item) => {
            if (item.id === action.element.id) {
                return false;
            } else if (item.content && Array.isArray(item.content)) {
                item.content = this.deleteElement(item.content, action);
            }
            return true;
        })
    }

    private getState(): EditorState {
        return {
            elements: this.elements,
            selectedElement: this.selectedElement,
            device: this.device,
        };
    }
}
