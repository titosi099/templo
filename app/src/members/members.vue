<template>
  <div>
    <a class="fixo button is-large is-danger is-loading" v-show="isLoading">Loading</a>
    <div class="container">
      <h1 class="title">{{title}}</h1>
      <div class="columns">
        <div class="column is-5">
          <p class="control has-addons">
            <input class="input is-expanded" type="text" placeholder="Procure pelo nome" v-model="search">
            <a class="button is-info" @click="searchMembers">Search</a>
          </p>
        </div>
        <!-- <div class="column is-5"><a class="fixo button is-info">Add</a></div> -->
      </div>
      <div class="columns">
        <div class="column is-12">
          <a class="fixo button is-info" href="#" @click.prevent="newMember()">Add</a>
          <table class="table is-narrow is-striped">
            <thead>
              <th>Codigo</th>
              <th>Nome</th>
              <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="member in members">
                <td>{{member.mem_codigo}}</td>
                <td>{{member.mem_nome}}</td>
                <td class="is-icon">

                  <a href="#" @click.prevent="editMember(member)">
                    <i class="fa fa-edit"></i>
                  </a>
                  <a href="#" @click.prevent="removeMember(member)">
                    <i class="fa fa-trash"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="modal" :class="{'is-active':showModal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">M: {{selected.mem_nome}}</p>
          <button class="delete" @click.prevent="showModal=false"></button>
        </header>
        <section class="modal-card-body">

          <div class="columns">
            <div class="column">
              <label class="label">Nome</label>
              <p class="control">
                <input class="input" type="text" placeholder="Text input" v-model="selected.mem_nome">
              </p>
            </div>
            <div class="column" v-show="selected.mem_codigo">
              <label class="label">Código</label>
              <p class="control">
                <input class="input" type="text" placeholder="Código" v-model="selected.mem_codigo">
              </p>
            </div>
          </div>

        </section>
        <footer class="modal-card-foot">
          <a class="button is-primary" @click.prevent="saveMember">Salvar</a>
          <a class="button" @click.prevent="showModal=false">Cancelar</a>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isLoading: false,
        title: '',
        search: '',
        members: [],
        page: 1,
        total: 0,
        selected: {},
        itensPerPage: 10,
        showModal: false
      }
    },
    components: {},
    methods: {
      onChangePage (page) {
        this.page = page
        this.loadMembers()
      },
      showLoading () {
        this.isLoading = true
      },
      hideLoading () {
        this.isLoading = false
      },
      loadMembers () {
        this.showLoading()

        this
          .axios
          .get(`http://localhost:3000/members`)
          .then(response => {
            this.members = response.data
            this.hideLoading()
          })
          .catch(error => {
            console.log(error)
          })
      },
      searchMembers () {
      },
      newMember () {
        this.selected = {}
        this.showModal = true
      },
      editMember (member) {
        this.selected = member
        this.showModal = true
      },
      saveMember () {
        let codMember = this.selected.mem_codigo
        if (codMember) {
          this.axios.put(`http://localhost:3000/members/${codMember}`, this.selected)
            .then(response => {
              this.selected = {}
              this.showModal = false
              this.loadMembers()
            })
            .catch(error => {
              console.error(error)
            })
        } else {
          this.axios.post(`http://localhost:3000/members`, this.selected)
            .then(response => {
              this.selected = {}
              this.showModal = false
              this.loadMembers()
            })
            .catch(error => {
              console.error(error)
            })
        }
      },
      removeMember (member) {
        window.swal(
          {
            title: 'Você tem certeza?',
            text: `Deseja apagar ${member.mem_nome}`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim, pode apagar!',
            showLoaderOnConfirm: true,
            closeOnConfirm: false
          },
          () => {
            this.axios.delete(`http://localhost:3000/members/${member.mem_codigo}`)
              .then(result => {
                window.swal('Membro removido!')
                this.loadMembers()
              })
          }
        )
      }
    },
    created () {
      this.loadMembers()
    }
  }

</script>

<style>
  .fixo {
    float: right;
  },
  .button {
    margin-right: 10px;
    margin-top: 10px;
    z-index: 1000;
  }
</style>
