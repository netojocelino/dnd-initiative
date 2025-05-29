<script setup lang="ts">
import { ref } from 'vue'
import ListInitiatives from './components/ListInitiatives.vue'
import ActionsRow from './components/ActionsRow.vue'
import Modal from './components/Modal.vue'
import { PlayerCondition } from './types/player'

const header = {
    title: 'Listar iniciativas',
}

const players = ref([
{
    player: false,
    name: 'Mané Perninha',
    class_armor: 15,
    health_points: 38,
    initiative: Math.ceil((Math.random() * 2000) % 20) + 3,
    conditions: [],
},{
    player: true,
    name: 'HG-7',
    class_armor: 18,
    health_points: 49,
    initiative: Math.ceil((Math.random() * 2000) % 20) + 1,
    conditions: [],
},{
    player: true,
    name: 'Salazar',
    class_armor: 18,
    health_points: 44,
    initiative: Math.ceil((Math.random() * 2000) % 20),
    conditions: [],
}, {
    player: true,
    name: 'Truna',
    class_armor: 19,
    health_points: 33,
    initiative: Math.ceil((Math.random() * 2000) % 20) + 1,
    conditions: [],
},
])

const showModal = ref(false)
const userId = ref(-1)

const playerStates = ref([
    {
        id: 1,
        name: 'Caído',
    },{
        id: 2,
        name: 'Atordoado',
    },{
        id: 3,
        name: 'Enfeitiçado',
    },{
        id: 4,
        name: 'Surpreso',
    },
]);

function addPlayer () {
    players.value.push({
        player: true,
        name: '',
        initiative: 0,
        class_armor: 0,
        health_points: 0,
        conditions: [],
    })
}
function addEnemy () {
    players.value.push({
        player: false,
        name: '',
        initiative: 0,
        class_armor: 0,
        health_points: 0,
        conditions: [],
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
    const length = players.value.length;
    for (let index = 0; index < length; index++) {
        players.value.pop();
    }
}
</script>

<template>
    <div class="template">
        <header>
            <h2>
                {{ header.title }}
            </h2>
        </header>
    
      <ListInitiatives
            @add-condition="(playerName, index) => {
                console.log(`Atualizando dados de ${playerName}`)

                if (index < 0) return;

                userId = index
                showModal = true;
            }"
            @update-initiative="updateInitiative"
            :players="players"
        />

      <ActionsRow @new-player="addPlayer" @new-enemy="addEnemy" @sort-list="sortList" @clear-list="clearList" :players="players" />

      <Modal
        :states="playerStates"
        :showing="showModal"
        :userId="userId"
        @shows="(attr) => { console.log({attr}); showModal = attr}"
        @add-states="(attr, index) => {
            players[index].conditions = attr.filter((item: PlayerCondition): boolean => item.checked);

            showModal = false
            console.log(players)
        }"
    />

      <footer>
        <p>
            Desenvolvido apenas para entender alguns comportamentos do vue
        </p>
      </footer>
    </div>
</template>

<style scoped>
.template {
    display: flex;
    flex-direction: column;
    flex: 1;
    /*height: 100%;*/
    padding: 0;
    width: 100%;
    min-height: 100%;
}

.template header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    max-height: 4rem;
}

.template footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* max-height: 2rem; */
    line-height: 1rem;
}
.template footer p {
    color: #000;
    cursor: pointer;
}
.template footer p:hover,
.template footer p:active
{
    color: #646cff;
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
