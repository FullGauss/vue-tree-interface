<template>
    <article class="editor">
        <section class="editor-header">
            <div class="buttons-panel">
                <button @click="createNewTreeElement">Добавить элемент</button>
                <button @click="show">Посмотреть результат</button>
            </div>
             <h1 class="title">Дерево записей</h1>
        </section>
        <section class="editor-workspace" v-if="checkCanElementsRender( elementTree.elements )">
            <div 
                class="element-root"
                v-for="(element, elementId) in elementTree.elements" 
                :key="element"
            >
                <TreeElement 
                    :attributes="element.attributes"
                    :elements="element.elements"
                />
                <button @click="deleteElement(elementId)" class="delete-element-button"></button>
            </div>
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
            checkCanArrayRender
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
        }
    }
}
</script>
<style scoped lang="scss" src="./ElementTreeView.scss"></style>