let main = async () => {
	// console.log('gogo')	
	let items = $('.subjects-jit-display > li')
	let itemsCount = items.length
	let scores = avgQuesScores(items.length)
	// console.log()
	// console.log()
	
	for (let i = 0; i < items.length; i++) {
		console.log('item', i, scores[i])
		let item = items.eq(i)
		
		item.click()
		
		await sleep()
		
		$(`[name="point"]`).val(scores[i])[0].dispatchEvent(new Event("input"))
		
		await sleep()
		
		// $(`#examSaveSubject`).click()
		$(`#examSaveSubject`)[0].dispatchEvent(new Event("click"))
		
		await sleep()
	}
	
	console.log('Finish')

	let ngClick = document.querySelector('.button-return').attributes['ng-click'].value
	let parts = ngClick.split('/')
	let id = parts[2]

	document.querySelector('.button-return').click()
	location.href = `https://iclass.tku.edu.tw/course/${id}/content#/`
}


function avgQuesScores(num) {
  let scores = []

  let baseScore = Math.floor(100 / num)
  let interval = 100 - (baseScore * num)

  for (let i = 0 ; i < num; i++) {
    if (i < interval) {
      scores.push((baseScore + 1))
    }
    else {
      scores.push((baseScore))
    }
  }

  return scores
}

function sleep (ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main()