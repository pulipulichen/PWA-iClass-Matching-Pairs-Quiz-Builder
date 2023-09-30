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
	document.querySelector('.button-return').click()
}


function avgQuesScores(num) {
  let scores = []

  let baseScore = Math.floor(100 / num)
  let interval = 100 - (baseScore * num)

  for (let i = 0 ; i < num; i++) {
    if (i === 0) {
      scores.push((interval + baseScore))
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