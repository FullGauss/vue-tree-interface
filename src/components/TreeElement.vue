<template>
    <div class="tree-element"
        draggable="true"
        dropzone="true"
        @dragstart="onDragStart($event, localElement)"
        @dragend="onDragEnd($event, localElement)"
        @dragleave="onDrugLeave($event)"
        @drop="onDrop( $event )"
        @dragover="onDrugOver($event)"
        @dragenter="onDrugEnter($event)"
    >
        <slot name="deleteButton"></slot>
        <div class="attributes-panel">
            <div class="attribute"
                v-for="(attribute, attributeId) in localElement.attributes"
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
        <div 
            class="subelements-panel" 
            v-if="checkCanElementsRender( localElements )"
            dropzone="true"
            @drop="onDrop( $event )"
            @dragover="onDrugOver($event)"
            @dragenter="onDrugEnter($event)"
        >
                
            <TreeElement
                v-for="(element, elementId) in localElement.elements" 
                :key="elementId"
                :element="element"
                @deleteDragElement="deleteElement(elementId)"
            >
                <template v-slot:deleteButton>
                    <button @click="deleteElement(elementId)" class="delete-element-button"></button>
                </template>
            </TreeElement>
        </div>
    </div>
</template>

<script>

import { toRefs, computed } from 'vue'
import checkCanArrayRender from '@/services/checks'

export default {
    props: {
        element: Object
    },
    setup(props, { emit }) {

        const { element } = toRefs(props);

        const localElement = computed({
            get: () => { 
                return element.value; 
            },
            set: (newElement) => {
                element.value = newElement;
            }

        });

        const localAttributes = computed(()=>{
            return localElement.value.attributes;
        });
        const localElements = computed(()=>{
            return localElement.value.elements;
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
            localElements.value.push(newElement);
        };

        const deleteAttribute = (attributeNumber) => {
            localAttributes.value.splice(attributeNumber, 1)
        };
        const deleteElement = (elementNumber) => {
            localElements.value.splice(elementNumber, 1)
        };

        const onDragStart = (event) => {
            event.stopPropagation();
            event.dataTransfer.clearData();
            event.dataTransfer.dropEffect = 'move';
            event.dataTransfer.affectAllowed = 'move';
            event.dataTransfer.setData('element', JSON.stringify(localElement.value));
            event.target.style = 'visibility: hidden;';
        };
        const onDrop = (event) => {
            event.stopPropagation();
            let droppingElement = JSON.parse(event.dataTransfer.getData('element'));
            localElements.value.push(droppingElement);
        };

        const onDragEnd = (event) => {
            event.stopPropagation();
            emit('deleteDragElement');
            event.target.style = 'visibility: visible;';
        };
        const onDrugOver = (event) => {
            event.stopPropagation();
            event.preventDefault();
        };
        const onDrugEnter = (event) => {
            event.stopPropagation();
            event.preventDefault();
        };
        const onDrugLeave = (event) => {
            event.stopPropagation();
            event.preventDefault();
        };

        return {
            localAttributes,
            localElements,
            localElement,
            createNewAttribute,
            checkCanElementsRender,
            createNewSubElement,
            deleteAttribute,
            deleteElement,
            onDragStart,
            onDrop,
            onDragEnd,
            onDrugOver,
            onDrugEnter,
            onDrugLeave
        }
    },
}
</script>
<style scoped lang="scss" src="../assets/scss/treeElement.scss"></style>