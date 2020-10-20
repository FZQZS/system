export default {
    data() {
        return {
          breadlist: []
        };
      },
      methods: {
        getBreadcrumb() {
          this.breadlist = this.$route.meta.bread ? this.$route.meta.bread : [];
        }
      },
      created() {
        this.getBreadcrumb();
      },
      watch: {
          $route(){
            this.getBreadcrumb();
          }
      },
}