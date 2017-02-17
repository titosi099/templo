<template>
  <div>
    <a class="fixo button is-large is-danger is-loading" v-show="loading">Loading</a>
    <div class="container">
      <h1 class="title">{{title}}</h1>
      <div class="columns">
        <div class="column is-5">
          <p class="control has-addons">
            <input class="input is-expanded" type="text" placeholder="Procure pelo nome" v-model="search">
            <a class="button is-info" @click="searchMembers">Search</a>
          </p>
        </div>
        <div class="column is-5">

        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <table class="table is-narrow is-bordered">
            <thead>
              <th>Codigo</th>
              <th>Nome</th>
              <th>Mais</th>
              <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="member in members">
                <td>{{member.mem_codigo}}</td>
                <td>{{member.mem_nome}}</td>
                <td class="is-icon">
                  <a href="#">
                    <i class="fa fa-map-marker"></i>
                  </a>
                  <a href="#" @click.prevent="newMember(member)">
                    <i class="fa fa-plus-circle"></i>
                  </a>
                </td>
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
          <Pagination :total="total" :page="page" :itens-per-page="itensPerPage" @change-page="onChangePage"></Pagination>
        </div>
      </div>
    </div>
    <div class="modal" :class="{'is-active':showModal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Membros: {{selected.mem_nome}}</p>
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
            <div class="column">
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
  import Pagination from './Pagination.vue'
  export default {
    data() {
      return {
        isLoading: false,
        title: 'Vue.js crud',
        search: '',
        members: [],
        page: 1,
        total: 0,
        selected: {},
        itensPerPage: 10,
        showModal: false
      }
    },
    components: {
      Pagination
    },
    methods: {
      onChangePage(page) {
        this.page = page
        this.loadMembers()
      },
      showLoading() {
        this.isLoading = true;
      },
      hideLoading() {
        this.isLoading = false;
      },
      loadMembers() {

        let t = this
        this.showLoading()

        let start = (this.page * this.itensPerPage) - this.itensPerPage
        let end = this.page * this.itensPerPage

        this
          .$http
          .get(`http://localhost:3000/members`)//?offset=${start}&limit=${end}
          .then(response => {
            t.members = response.body
            //t.total = response.headers['X-Total-Count']
          },
          error => {
            console.log(error)
          }).finally(function () {
            t.hideLoading();
          })

      },
      searchMembers() {

      },
      newMember() {
        this.selected = {}
        this.showModal = true;
      },
      editMember(member) {
        this.selected = member
        this.showModal = true
      },
      saveMember() {
        if (this.selected.mem_codigo != null) {  //EDIT
          this.$http.put(`http://localhost:3000/members/${this.selected.mem_codigo}`, this.selected)
            .then(
            response => {
              this.selected = {}
              this.showModal = false
            },
            error => {
              console.error(error)
            }
            )
            .finally(() => {
              this.loadMembers()
            }
            )
        }
        else { //NEW
          this.$http.post(`http://localhost:3000/members`, this.selected)
            .then(
            response => {
              this.selected = {}
              this.showModal = false
            },
            error => {
              console.error(error)
            }
            )
            .finally(() => {
              this.loadMembers()
            }
            )
        }
      },
      removeMember(member) {
        let self = this
        swal(
          {
            title: "Você tem certeza?",
            text: `Deseja apagar "${member.mem_nome}"`,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sim, pode apagar!",
            showLoaderOnConfirm: true,
            closeOnConfirm: false
          }, 
          () => {
            self.$http.delete(`http://localhost:3000/members/${member.mem_codigo}`)
              .then(result => {
                swal("Membro removido!")
                self.loadMembers()
              })
          }
        )
      }
    },
    created() {
      this.loadMembers();
    }
  }

</script>

<style>
  .fixo {
    float: right;
    margin-right: 10px;
    margin-top: 0px;
    z-index: 1000;
  }
</style>