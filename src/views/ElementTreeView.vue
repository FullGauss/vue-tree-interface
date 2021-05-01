<template>
    <article v-if="checkCanElementsRender( elementTree.elements )">
        <TreeElement 
            v-for="element in elementTree.elements" 
            :key="element"
            :attributes="element.attributes"
            :elements="element.elements"
        />
    </article>
    <button @click="createNewTreeElement">Добавить элемент</button>
    <button @click="show">Посмотреть результат</button>
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
            console.log(this.elementTree);
        }
    }
}
</script>