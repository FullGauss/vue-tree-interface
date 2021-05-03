<template>
    <article class="editor">
        <section class="editor-header">
            <div class="buttons-panel">
                <button @click="createNewTreeElement">Добавить элемент</button>
                <button @click="show">Посмотреть результат</button>
            </div>
             <h1 class="title">Дерево записей</h1>
        </section>
        <section 
            class="editor-workspace" 
            
            dropzone="true"
            @drop="onDrop( $event )"
            @dragover="onDrugOver($event)"
            @dragenter="onDrugEnter($event)"
        >
            <TreeElement
                    v-for="(element, elementId) in elementTree.elements" 
                    :key="elementId"
                    :element="element"
                    @deleteDragElement="deleteElement(elementId)"
            >
                <template v-slot:deleteButton>
                    <button @click="deleteElement(elementId)" class="delete-element-button"></button>
                </template>
            </TreeElement>
        </section>
    </article>
</template>

<script>
import { ref } from 'vue'
import checkCanArrayRender from '@/services/checks'

export default {
    setup() {
        const elementTree = ref({
            elements : []
        });
        const createNewTreeElement = () => {
            let newElement = {
                attributes: [],
                elements: []

            };
            elementTree.value.elements.push(newElement);
        };
        return {
            elementTree,
            createNewTreeElement,
            checkCanArrayRender,
        }
    },
    methods: {
        checkCanElementsRender( checkedElements ) {
           return checkCanArrayRender(checkedElements);
        },
        show() {
            const jsonTree = JSON.stringify(this.elementTree)
            console.log(jsonTree);
        },
        deleteElement(elementId){
            this.elementTree.elements.splice(elementId, 1)
        },
        onDrop (event) {
            let droppingElement = JSON.parse(event.dataTransfer.getData('element'));
            // event.dataTransfer.setData('returnElement', JSON.stringify(currentElement.value));
            // currentElement.value = droppingElement;
            this.elementTree.elements.push(droppingElement);
        },
        onDrugOver (event) {
            event.stopPropagation();
            event.preventDefault();
        },
        onDrugEnter(event) {
            event.stopPropagation();
            event.preventDefault();
        },
    }
}
</script>
<style scoped lang="scss" src="./ElementTreeView.scss"></style>