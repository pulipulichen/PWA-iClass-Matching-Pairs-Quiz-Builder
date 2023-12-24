var start_index = 3

var chapter_id = `syllabus_288625`
// 查詢 $(`#chapter_id`).val()

var group_id = `153605`
// 查詢 $(`#group-set-selector`).val()

// ----------------------------------------------------------------

var title_prefix = `[B] 測驗 16. 編目大亂鬥 Round - `
var test_groups = 16

var test_start_time = `2023-12-27T01:00:00Z`
var test_end_time = `2023-12-27T04:00:00Z`

var score = 0.2

// ----------------------------------------------------------------


var test_setting = async function (index) {
  $(`.course-toolbar.collapse.button-container.exam [reveal-modal="exam-popup"]`).click()

  await sleep(2000)

  $(`[name="chapter_id"]`).val(chapter_id).change()
  $(`[name="title"]`).val(`${title_prefix}${index}`).change()

  $(`[name="submit_start_time"]`).val(test_start_time).change()
  $(`[name="submit_end_time"]`).val(test_end_time).change()

  // $(`.glyphicon.glyphicon-calendar`).click()

  $('.ivu-input-number-input').val(score).change()

  $(`[name="announceScore"][value="immediate_announce"]`).click()
  $(`[name="announceAnswer"][value="immediate_announce"]`).click()

  // ----------------------------------------------------------------

  $(`.show-advanced`).click()
  $(`[name="submit_by_group"][value="submit_by_group"]`).click()

  $(`[name="group-set-selector"]`).val(test_start_time).change()

  await sleep()

  $(`.exam-area-content .button.button-green.medium`).click()

  await sleep(3000)

  $(`.go-back-link`).click()
}

var sleep = function (ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var main = async function () {
  for (var i = start_index; i <= test_groups; i++) {
    await test_setting(i)
    // return

    console.log(`next`)
    return
  }
}

main()