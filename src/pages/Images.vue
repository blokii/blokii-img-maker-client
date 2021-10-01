<template>
  <q-page class="row">
    <div class="col-12 q-pa-md q-my-md">
      <q-table
        :dense="$q.screen.lt.md"
        title="Saved Images"
        :data="images"
        :columns="columns"
        row-key="id"
        title-class="text-black"
        class="q-pa-md q-ma-md"
        :pagination.sync="paginationOpts"
        @request="updatePagination"
        flat
      >
        <template v-slot:body-cell-filename="props">
          <q-td :props="props">
            <router-link :to="`/image/${props.row.id}`">{{
              props.row.filename
            }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              size="sm"
              dense
              color="negative"
              class="q-ml-md"
              icon="fas fa-trash"
              @click="deleteImage(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { date } from "quasar";

export default {
  mounted() {
    this.findImages();
  },
  data() {
    return {
      paginationOpts: {
        sortBy: "createdAt",
        descending: true,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 20
      },
      columns: [
        {
          name: "createdAt",
          label: "Created",
          field: "createdAt",
          align: "left",
          format: val => date.formatDate(val, "MMM DD, YYYY")
        },
        {
          name: "filename",
          label: "Filename",
          field: "filename",
          align: "left"
        },
        {
          name: "action",
          align: "center",
          label: "Actions"
        }
      ],
      images: []
    };
  },
  computed: {
    imagesParams() {
      let opts = {};
      let sort = {};
      sort["createdAt"] = -1;
      sort[this.paginationOpts.sortBy] = this.paginationOpts.descending
        ? -1
        : 1;
      opts["$limit"] = this.paginationOpts.rowsPerPage;
      opts["$skip"] =
        (this.paginationOpts.page - 1) * this.paginationOpts.rowsPerPage;
      opts["$sort"] = sort;
      return {
        query: {
          ...opts
        },
        paginate: false
      };
    }
  },
  methods: {
    updatePagination(requestProps) {
      if (requestProps) {
        this.paginationOpts = requestProps.pagination;
        this.findImages();
      }
    },
    findImages() {
      this.$feathersClient
        .service("images")
        .find(this.imagesParams)
        .then(result => {
          this.images = result.data;
          this.paginationOpts.rowsNumber = result.total;
        });
    },
    deleteImage(id) {
      this.$feathersClient
        .service("images")
        .remove(id)
        .then(() => {
          this.findImages();
          this.$q.notify({
            message: "Successfully deleted image",
            color: "positive",
            icon: "fas fa-check"
          });
        })
        .catch(err => {
          console.error("Error", err);
          this.$q.notify({
            message: "There was an error in deleting this image",
            color: "negative",
            icon: "fas fa-exclamation-triangle"
          });
        });
    }
  }
};
</script>
