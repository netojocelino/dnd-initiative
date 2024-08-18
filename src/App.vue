<script setup lang="ts">
import { ref } from 'vue'
import ListInitiatives from './components/ListInitiatives.vue'
import ActionsRow from './components/ActionsRow.vue'
import { Player } from './types/player';

const header = {
    title: 'Listar iniciativas',
}

const players = ref([
    {
        player: false,
        name: 'Bad, o bandido',
        class_armor: 14,
        health_points: 20,
        initiative: Math.ceil((Math.random() * 2000) % 20),
    },{
        player: true,
        name: 'Wis, o Sábio',
        class_armor: 14,
        health_points: 20,
        initiative: Math.ceil((Math.random() * 2000) % 20),
    },{
        player: true,
        name: 'Luz&Fé, o caído',
        class_armor: 14,
        health_points: 0,
        initiative: Math.ceil((Math.random() * 2000) % 20),
    }, {
        player: true,
        name: 'Carlos, o humilde',
        class_armor: 14,
        health_points: 20,
        initiative: Math.ceil((Math.random() * 2000) % 20),
    },
])


function addPlayer () {
    players.value.push({
        player: true,
        name: '',
        initiative: 0,
        class_armor: 0,
        health_points: 0,
    })
}
function addEnemy () {
    players.value.push({
        player: false,
        name: '',
        initiative: 0,
        class_armor: 0,
        health_points: 0,
    })
}

function updateInitiative (arg: () => Number) {
    console.log('setInitiative', arg())
}

function sortList () {
    for (let index = 0; index < players.value.length; index++) {
        for (let subindex = 0; subindex < players.value.length; subindex++) {
            console.log({
                index: players.value[index].initiative,
                subindex: players.value[subindex].initiative
            })
            if (players.value[index].initiative > players.value[subindex].initiative) {
                const toChange = players.value[subindex];
                players.value[subindex] = players.value[index];
                players.value[index] = toChange;
            }
        }
    }
}
function clearList () {
    console.log('clear Player list on app.vue')
}
</script>

<template>
    <div class="template">
        <header>
            <h2>
                {{ header.title }}
            </h2>
        </header>
    
      <ListInitiatives @update-initiative="updateInitiative" :players="players" />

      <ActionsRow @new-player="addPlayer" @new-enemy="addEnemy" @sort-list="sortList" @clear-list="clearList" :players="players" />
    </div>
</template>

<style scoped>
.template {
    display: flex;
    flex-direction: column;
    /* flex: 1; */
    height: 100%;
    min-height: 100%;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

</style>
