<script setup lang="ts">
import { defineProps } from 'vue';
import { PlayerCondition, PlayerState } from '../types/player';

type PlayerNewState = PlayerState & {
    available?: boolean
}

const newStates: PlayerCondition[] = [];

defineProps<{ 
    userId: number,
    states: PlayerNewState[],
    showing: boolean,
 }>()

</script>

<template>
<div class="modal-over" :style="`display: ${showing ? 'block' : 'none' };`">
    <div class="modal">
        <div class="container">
            <h3>Modal</h3>        

            <form action="">

                <!-- <label for="">
                    <span>Turnos</span>
                    <input type="number" placeholder="Qt. de turnos" min="1" v-change="turns">
                </label> -->

                <div v-if="states.length > 0" style="display: flex; flex-direction: column;">
                    <span style="display: flex; align-items: flex-start; border-bottom: 1px solid; padding-left: 10px;">Estado</span>

                    <label :for="`state_${state.id}`" v-for="state in states" :key="state.id" :value="state.id">
                        {{  state.name  }}
                        <input
                            :id="`state_${state.id}`"
                            type="checkbox"
                            :data-name="state.name"
                            :value="state.id"
                            v-on:change="(item) => {
                                const $item = (<HTMLInputElement> item.target);
                                if ($item == null) return;
                                const value = $item.value;
                                const checked = $item.checked == true;

                                const findIndex = newStates.findIndex((item) => `${item.id}` == value)

                                if (findIndex < 0) {
                                    newStates.push({
                                        id: value,
                                        name: $item.dataset.name,
                                        checked: checked,
                                    })
                                } else {
                                    newStates[findIndex].checked = checked;
                                }
                            }"
                        >
                    </label>
                </div>


                <button type="button" v-on:click="() => $emit('add-states', newStates, userId)">Salvar</button>
                <button type="button" v-on:click="() => $emit('shows', false)">Fechar</button>
            </form>

        </div>
        
    </div>
</div>
</template>

<style scoped>
.modal-over {
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
}
.modal {
    position: absolute;
    border: 2px solid #ff000f;
    border-radius: 5px;
    background-color: #ccc;
    
    height: min(500px, 80%);
    width: min(500px, 80%);

    top: 10rem;
    bottom: 0;
    left: 0;
    right: 0;

    margin: 2rem auto 0 auto;

}

.container {
    display: flex;
    flex-direction: column;

    color: black;
}

form,
label {
    /* background-color: red; */
    display: flex;
    flex: 1;
    justify-content: space-between;
    /* align-items: center; */
    /* align-self: center; */
}

form {
    flex-direction: column;
    /* max-width: 90%; */
    gap: .5rem;
    width: 90%;
    margin: 0 auto;
    background-color: pink;
}


label,
button
{
    /* max-width: 90%; */
    /* margin: 0 auto; */
    /* align-items: center; */

}

form div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    
}

</style>
