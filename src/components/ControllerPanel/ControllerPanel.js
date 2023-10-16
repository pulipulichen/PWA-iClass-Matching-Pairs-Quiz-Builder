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
    },
    examples () {
      return Object.keys(this.db.config.inputTextExamples).map((key) => {
        return {
          key,
          text: this.db.config.inputTextExamples[key]
        }
      })
    },
    currentExample () {
      return this.db.config.inputTextExamples[this.db.localConfig.selectExample]
    }
  },
  mounted() {
    if (this.db.localConfig.inputText === '') {
      this.setExample()
    }
  },
  methods: {
    setExample () {
      // console.log(this.db.config.inputTextExamples)
      // console.log(this.db.localConfig.selectExample)
      // console.log(this.currentExample)
      this.db.localConfig.inputText = this.currentExample
    },
    // setExampleGroup () {
    //   this.db.localConfig.inputText = this.db.config.inputTextExampleGroup
    // },
    copyScoringScript: async function () {
      let script = await this.db.utils.AxiosUtils.get('./assets/scroing-script.js')
      this.db.utils.ClipboardUtils.copyPlainString(script)
    },
    downloadTemplate () {
      let quizArray = this.parseQuizGroupArray()


      // console.log(quizArray)
      this.db.utils.FileUtils.downloadZippedXLS(this.getFilename(), quizArray)
    },
    getFilename () {
      
      // let pairs = this.getPairs()
      let groups = this.getPairsGroup()

      let optionsString = ``
      for (let i = 0; i < groups.length; i++) {
        for (let j = 0; j < groups[i].length; j++) {
          
          if (optionsString.length > 15) {
            break
          }

          if (optionsString !== '') {
            optionsString = optionsString + ','
          }
          optionsString = optionsString + groups[i][j][0]
        }
          
      }
      
      return `quiz-` + optionsString + '-' +  (new Date()).mmddhhmm()
    },
    getCode (i) {
      i = i % this.AToZ.length
      // console.log(i, this.AToZ)
      return this.AToZ[i]
    },
    // getPairs () {
    //   return this.db.localConfig.inputText.trim().split(`\n`).map((line, i) => {
    //     let pos = line.indexOf(`\t`)
    //     if (pos > -1) {
    //       let term = line.slice(0, pos).trim()
    //       let description = line.slice(pos).trim()
    //       return [term, description, this.getCode(i)]
    //     }
    //     else {
    //       return [i, line.trim(), this.getCode(i)]
    //     }
    //   })
    // },
    getPairsGroup () {
      // console.log( this.db.localConfig.inputText.trim().indexOf('\n'))
      let text = this.db.localConfig.inputText.trim()
      text = text.split(`\n`).map(l => l.trim()).join(`\n`).trim()
      // console.log(text)
      return text.split(`\n\n`).map((group, g) => {
        // console.log(group)
        let groupOptions = []
        let groupOutput = group.trim().split(`\n`).map((line, i) => {
          let pos = line.indexOf(`\t`)
          if (pos > -1) {
            let term = line.slice(0, pos).trim()

            let description = line.slice(pos).trim()
            description = this.parseRichDescription(description)
            // return [term, description, this.getCode(i)]
            if (groupOptions.indexOf(term) === -1) {
              groupOptions.push(term)
            }
            return [term, description]
          }
          else {
            // return [i, line.trim(), this.getCode(i)]
            if (groupOptions.indexOf(i) === -1) {
              groupOptions.push(i)
            }
            return [i, line.trim()]
          }
        })

        for (let i = 0; i < groupOutput.length; i++) {
          let term = groupOutput[i][0]
          let index = groupOptions.indexOf(term)
          groupOutput[i].push(this.getCode(index))
        }

        return groupOutput
      })
    },
    parseRichDescription (description) {
      description = description.trim()
      if (description.startsWith(`https://blogger.googleusercontent.com/img/`) || 
        (description.startsWith(`https://`) && (description.indexOf('.png ') > -1 || description.indexOf('.jpg ') > -1 || description.indexOf('.jpeg ') > -1 || description.indexOf('.gif ') > -1 ) )) {
        let url = description.slice(0, description.indexOf(' ')).trim()
        let content = description.slice(description.indexOf(' ') + 1).trim()
        return `<p><a href="${url}" target="_blank"><img src="${url}" style="width:100%; height: auto;" /></a></p><p>${content}</p>`
      }
      return description
    },
//     parseQuizArray () {
//       let pairs = this.getPairs()
//       // console.log(pairs)

//       let codes = pairs.map(pair => pair[2])
//       let options = pairs.map(pair => pair[0])
//       let shuffledParis = this.db.utils.DataUtils.shuffleArray(pairs)
//       console.log(shuffledParis)
//       let output = [
//         [`注意事項：
// 1.製作工具：https://pulipulichen.github.io/PWA-iClass-Matching-Pairs-Quiz-Builder/
// 2.當前可以批量匯入的題目類型有：單選題，複選題，是非題三種。請嚴格按照這些專有名詞來填寫。
// 3.下方列表的題型、題幹、難易度、答案為必填。題目選項和答案全部用英文大寫字母，是非題的答案用A,B表示，A是正確，B是錯誤。
// 4.多選題答案多於一個時，答案之間用“,”(英文逗號)分隔。
// 5.如果題幹或者選項中包含圖片，圖片用“@@1531106595775.jpg@@”。
// 6.同一份試卷的圖片跟 Excel需放置於同一資料夾內。`],
//         [`請根據上方的規則進行填寫。`],
//         [
//           `題型*`, `題幹*`, `難易度*`, `答案*`, `正確答案解釋`,
//           ...(codes.map(code => `選項-` + code))
//         ]
//       ]

//       shuffledParis.forEach(pair => {
//         output.push([
//           `單選題`,
//           pair[1],
//           '中',
//           pair[2],
//           '',
//           ...options
//         ])
//       })

//       return output
//     },
    // getCodesFromGroups (groups) {
    //   // let codes
    //   // let tempCodes
    //   // let maxCodesLength

    //   // group.forEach(pairs => {

    //   // })
    //   let tempGroups = JSON.parse(JSON.stringify(groups))
    //   tempGroups.sort((a, b) => b.length - a.length)

    //   let codes = []
    //   for (let i = 0; i < tempGroups[0].length; i++) {
    //     codes.push(this.getCode(i))
    //   }
    //   return codes
    // },
    parseQuizGroupArray () {
      let groups = this.getPairsGroup()
      console.log(groups)
      // console.log(pairs)

      // let codes = this.getCodesFromGroups(groups)
      
      let body = []
      let maxOptions = 0
      groups.forEach(pairs => {

        if (pairs.length > 1) {
          let options = []
          pairs.forEach(pair => {
            let option = pair[0].trim()
            if (options.indexOf(option) === -1) {
              options.push(option)
            }
          })
          let shuffledParis = this.db.utils.DataUtils.shuffleArray(pairs)
          console.log(shuffledParis)
          
          if (options.length > maxOptions) {
            maxOptions = options.length
          }
          shuffledParis.forEach(pair => {
            body.push([
              `單選題`,
              pair[1],
              '中',
              pair[2],
              '',
              ...options
            ])
          })
        }
        else {
          let answer = pairs[0][0].trim()
          let parts = pairs[0][1].split('\t').map(p => p.trim())
          let question = parts[0]
          let options = parts.slice(1)
          let answerOptionCode = this.getCode(options.indexOf(answer))
          if (options.length > maxOptions) {
            maxOptions = options.length
          }
          body.push([
            `單選題`,
            question,
            '中',
            answerOptionCode,
            '',
            ...options
          ])
        }
      })

      let codes = []
      for (let i = 0; i < maxOptions; i++) {
        codes.push(this.getCode(i))
      }

      let header = [
        [`注意事項：
1.製作工具：https://pulipulichen.github.io/PWA-iClass-Matching-Pairs-Quiz-Builder/
2.當前可以批量匯入的題目類型有：單選題，複選題，是非題三種。請嚴格按照這些專有名詞來填寫。
3.下方列表的題型、題幹、難易度、答案為必填。題目選項和答案全部用英文大寫字母，是非題的答案用A,B表示，A是正確，B是錯誤。
4.多選題答案多於一個時，答案之間用“,”(英文逗號)分隔。
5.如果題幹或者選項中包含圖片，圖片用“@@1531106595775.jpg@@”。
6.同一份試卷的圖片跟 Excel需放置於同一資料夾內。`],
        [`請根據上方的規則進行填寫。`],
        [
          `題型*`, `題幹*`, `難易度*`, `答案*`, `正確答案解釋`,
          ...(codes.map(code => `選項-` + code))
        ]
      ]

      let output = header.concat(body)

      console.log(output)
      return output
    }
  }

}

export default app