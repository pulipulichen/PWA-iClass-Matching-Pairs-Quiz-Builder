let app = {
  props: ['db'],
  components: {
    // DataTaskManager: () => import(/* webpackChunkName: "components/DataTaskManager" */ './DataTaskManager/DataTaskManager.vue')
  },
  data () {    
    this.$i18n.locale = this.db.localConfig.locale
    return {
      AToZ: `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
    }
  },
  watch: {
    'db.localConfig.locale'() {
      this.$i18n.locale = this.db.localConfig.locale;
    },
  },
  computed: {
    computedStyleDownloadButton () {
      let classes = []

      if (this.db.localConfig.inputText.trim() === '') {
        classes.push('disabled')
        return classes
      }
      if (this.db.localConfig.inputText !== this.db.config.inputTextExample && 
          this.db.localConfig.inputText.trim() !== '') {
        classes.push('positive')
      }

      // {positive: (db.localConfig.inputText !== db.config.inputTextExample && db.localConfig.inputText.trim() !== '')}
      return classes
    }
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
    copyScoringScript: async function () {
      let script = await this.db.utils.AxiosUtils.get('./assets/scroing-script.js')
      this.db.utils.ClipboardUtils.copyPlainString(script)
    },
    downloadTemplate () {
      let quizArray = this.parseQuizArray()

      console.log(quizArray)
    },
    getCode (i) {
      i = i % this.AToZ.length
      return this.AToZ.slice(i, 1)
    },
    getPairs () {
      return this.db.localConfig.inputText.trim().split(`\n`).map((line, i) => {
        let pos = line.indexOf(`\t`)
        if (pos > -1) {
          let term = line.slice(0, pos).trim()
          let description = line.slice(pos).trim()
          return [term, description, this.getCode(i)]
        }
        else {
          return [i, line.trim(), this.getCode(i)]
        }
      })
    },
    parseQuizArray () {
      let pairs = this.getPairs()

      let codes = pairs.map(pair => pair[2])
      let options = pairs.map(pair => pair[0])
      let shuffledParis = this.db.utils.DataUtils.shuffleArray(pairs)

      let output = [
        [`注意事項：
1.當前可以批量匯入的題目類型有：單選題，複選題，是非題三種。請嚴格按照這些專有名詞來填寫。
2.下方列表的題型、題幹、難易度、答案為必填。題目選項和答案全部用英文大寫字母，是非題的答案用A,B表示，A是正確，B是錯誤。
3.多選題答案多於一個時，答案之間用“,”(英文逗號)分隔。
4.如果題幹或者選項中包含圖片，圖片用“@@1531106595775.jpg@@”。
5.同一份試卷的圖片跟 Excel需放置於同一資料夾內。`],
        [`請根據上方的規則進行填寫。`],
        [
          `題型*`, `題幹*`, `難易度*`, `答案*`, `正確答案解釋`,
          ...(codes.map(code => `選項-` + code))
        ]
      ]

      shuffledParis.forEach(pair => {
        output.push([
          `單選題`,
          pair[1],
          '中',
          pair[2],
          '',
          ...options
        ])
      })

      return output
    }
  }
}

export default app