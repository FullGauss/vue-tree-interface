<template>
    <div class="tree-element">
        <div class="attributes-panel">
            <div class="attribute"
                v-for="(attribute, attributeId) in localAttributes"
                :key="attribute.id"
            >
                <input
                    v-model="attribute.text"
                    type="text" >
                <button class="delete-button"
                        @click="deleteAttribute(attributeId)"
                >
                </button>
            </div>
            
        </div>
        <div class="buttons-panel">
            <button @click="createNewAttribute">Добавить запись</button>
            <button @click="createNewSubElement">Добавить элемент</button>
        </div>
        <div class="subelements-panel" v-if="checkCanElementsRender( localElements )">
            <div 
                class="sub-element"
                v-for="(element, elementId) in localElements" 
                :key="element"
            >
                <TreeElement 
                    :attributes="element.attributes"
                    :elements="element.elements"
                />
                <button @click="deleteElement(elementId)" class="delete-element-button"></button>
            </div>
        </div>
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
        };

        const deleteAttribute = (attributeNumber) => {
            localAttributes.value.splice(attributeNumber, 1)
        };
        const deleteElement = (elementNumber) => {
            localElements.value.splice(elementNumber, 1)
        };

        return {
            localAttributes,
            localElements,
            createNewAttribute,
            checkCanElementsRender,
            createNewSubElement,
            deleteAttribute,
            deleteElement
        }
    },
}
</script>
<style scoped lang="scss" src="../assets/scss/treeElement.scss"></style>