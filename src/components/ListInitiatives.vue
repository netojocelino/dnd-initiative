<script setup lang="ts">
import { Player } from '../types/player';


defineProps<{ players: Player[] }>()

function setInput (obj: Object, index: number, column: string, event: any, isNumber = false) {
    if (event.target && event.target.value) {
        obj[index][column] = (isNumber) ? event.target.value : (new Number(event.target.value))
    }
}

function Rolling (index: any) {
    function cb (input: any) {
        console.log('cb: ', input)
    }
    // players[index] = 
    console.log('rolling', index)
    return cb
}

</script>

<template>
    <div class="players-list">
        <div v-if="players.length > 0" class="player-line" v-for="(player, index) in players" :key="index" :data-ally="player.player ? 'true' : 'false'">
            <div class="name">
                <span class="text-shadow">{{ player.player ? 'Aliado' : 'Inimigo'}}</span>
                <input placeholder="Nome do jogador" type="text" name="name" :value="player.name" @input="event => setInput(players, index, 'name', event)">
                <span class="alert" v-if="player.health_points < 1">(Caído)</span>
            </div>
            <div class="inputs">
                <label for="">
                    <span>Iniciativa</span>
                    <input placeholder="Iniciativa" type="text" name="initiative" :value="player.initiative" @input="event => setInput(players, index, 'initiative', event, true)">
                </label>
                <label for="">
                    <span>Classe de Armadura</span>
                    <input placeholder="Classe de Armadura" type="text" name="class_armor" :value="player.class_armor"  @input="event => setInput(players, index, 'class_armor', event, true)">
                </label>
                <label for="">
                    <span>Pontos de vida</span>
                    <input placeholder="Pontos de vida" type="text" name="health_points" :value="player.health_points"  @input="event => setInput(players, index, 'health_points', event, true)">
                </label>
            </div>
        </div>
        <div v-else>
            <h4>
                Não existem jogadores cadastrados
            </h4>
            <p>😮‍💨</p>
        </div>
    </div>

</template>

<style scoped>
.name {
    background-color: #cfcfcf;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    row-gap: 10px;
    column-gap: 20px;
    /* max-width: min(40rem, 50%); */
}
.name input {
    width: 100%;
    height: 100%;
    padding: 1rem;
    background-color: transparent;
    color: black;
    font-weight: bolder;
    border: 0px solid;
}
.name span {
    font-weight: bold;
}
.name span.alert {
    color: red;
}
.name span.warning {
    color: yellow;
}
.name span.success {
    color: yellowgreen;
}

.text-shadow {
    border-bottom: 1px solid #666;
    text-shadow: 2px 1px 1px #666;
}

.players-list {
    display: flex;
    flex-direction: column;
    flex: 3;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0rem 0rem 0rem 0rem;
    width: 100%;
    max-height: calc(100% - 4rem - 9rem);
}

.players-list .player-line:not(:last-of-type) {
    margin: 1rem 0px;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgb(70, 66, 66);
}

.players-list .player-line[data-ally=true] {
    background-color: rgba(0, 128, 0, 0.4);
}
.players-list .player-line[data-ally=false] {
    background-color: rgba(255, 0, 0, 0.4);
}

.inputs {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.inputs label {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
    align-items: center;
}

</style>
