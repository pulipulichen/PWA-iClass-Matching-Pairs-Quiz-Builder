let app = {
  props: ['db'],
  components: {
    // DataTaskManager: () => import(/* webpackChunkName: "components/DataTaskManager" */ './DataTaskManager/DataTaskManager.vue')
  },
  data () {    
    this.$i18n.locale = this.db.localConfig.locale
    return {
    }
  },
  watch: {
    'db.localConfig.locale'() {
      this.$i18n.locale = this.db.localConfig.locale;
    },
  },
  computed: {
    
  },
  mounted() {
    if (this.db.localConfig.inputText === '') {
      this.setExample()
    }
  },
  methods: {
    setExample () {
      this.db.localConfig.inputText = this.db.config.inputTextExample
    },
    downloadTemplate () {

    },
    copyScoreScript () {

    }
  }
}

export default app