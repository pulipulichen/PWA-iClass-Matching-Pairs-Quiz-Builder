var start_index = 1

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
  $(`.button.edit.ng-scope`).click()

  await sleep(2000)

  $(`.show-advanced`).click()
  await sleep()

  $(`[name="submit_by_group"][value="true"]`).click()

  $(`[name="group_set_id"]`).val(group_id).change()

  await sleep()

  $(`.exam-area-content .button.button-green.medium`).click()

  // await sleep(500)

  let buttonReturn = document.querySelector('.button-return')
	if (!buttonReturn) {
		buttonReturn = document.querySelector('.button.full-screen-header-button.ng-scope')
	}

	let ngClick = buttonReturn.attributes['ng-click'].value
	let parts = ngClick.split('/')
	let id = parts[2]

	buttonReturn.click()
	location.href = `https://iclass.tku.edu.tw/course/${id}/content#/`
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