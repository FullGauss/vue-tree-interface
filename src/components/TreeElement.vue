<template>
    <button @click="createNewAttribute">Добавить атрибут</button>
    <button @click="createNewSubElement">Добавить элемент</button>
    <div v-if="checkCanElementsRender( localAttributes )">
        <input
            v-for="attribute in localAttributes"
            :key="attribute.id"
            v-model="attribute.text"
            type="text" >
    </div>
    <div v-if="checkCanElementsRender( localElements )">
        <TreeElement 
            v-for="element in localElements" 
            :key="element"
            :attributes="element.attributes"
            :elements="element.elements"
        />
    </div>
</template>

<script>

import { toRefs, computed } from 'vue'
import checkCanArrayRender from '@/services/checks'

export default {
    props: {
        attributes: Array,
        elements: Array
    },
    setup(props) {

        const { attributes, elements } = toRefs(props);

        const localAttributes = computed(()=>{
            return attributes.value;
        });
        const localElements = computed(()=>{
            return elements.value;
        });

        const createNewAttribute = () => {

            let newAttribute = {
                text: '',
            };
            localAttributes.value.push(newAttribute);

        };

        const checkCanElementsRender = (checkedArray) => {
            return checkCanArrayRender(checkedArray);
        };
        
        const createNewSubElement = () => {
            let newElement = {
                attributes: [],
                elements: []
            };
            elements.value.push(newElement);
        }

        return {
            localAttributes,
            localElements,
            createNewAttribute,
            checkCanElementsRender,
            createNewSubElement
        }
    },
}
</script>