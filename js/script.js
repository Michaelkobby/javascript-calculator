const calculator = document.querySelector('.container')
const keys = calculator.querySelector('.numbers')
const screen = document.querySelector('.calculator__screen')

keys.addEventListener('click', (e)=>{
	if(e.target.matches('button')){
		const key = e.target 
		const action = key.dataset.action
		const keyContent = key.textContent
		const displayedNumber = screen.textContent
		const previousKeyType = calculator.dataset.previousKeyType
		if(action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide'){
			const firstValue = calculator.dataset.firstValue
			const secondValue = displayedNumber
			const operator = calculator.dataset.operator
			
			if(firstValue && operator && previousKeyType !== 'operator' && previousKeyType !=='calculate'){
				const calcValue = calculate(firstValue, operator, secondValue)
				screen.textContent = calcValue
				calculator.dataset.firstValue = calcValue

			}
			else{
				calculator.dataset.firstValue = displayedNumber
			}
			key.classList.add('is-depressed')
			calculator.dataset.previousKeyType = 'operator'
			calculator.dataset.firstValue = displayedNumber
			calculator.dataset.operator = action

			if(firstValue && operator && previousKeyType != 'operator'){
				screen.textContent = calculate(firstValue,operator,secondValue)
			}
		}
		const calculate = (n1, operator, n2)=>{
			let result = ''
			if(operator === 'add'){
				result = parseFloat(n1) + parseFloat(n2)
			}else if(operator === 'subtract'){
				result = parseFloat(n1) - parseFloat(n2)
			} else if(operator === 'multiply'){
				result = parseFloat(n1) * parseFloat(n2)
			} else if(operator === 'divide'){
				result = parseFloat(n1) / parseFloat(n2)
			}
			return result;
		}
		if (action === 'decimal') {
			if(!displayedNumber.includes('.')){
				screen.textContent = displayedNumber + '.'
			}else if(previousKeyType === 'operator'){
				screen.textContent = '0.'
			}
			calculator.dataset.previouKey = 'decimal'
		}
		  
		  if (action === 'clear') {
			  const clearButton = calculator.querySelector('[data-action=clear]')
			  clearButton.textContent = 'CE'
			  screen.textContent = 0
			  key.textContent = 'AC'
			  calculator.dataset.previousKeyType = 'clear'
		  }
		  
		  if (action === 'calculate') {
			const firstValue = calculator.dataset.firstValue
			const secondValue = displayedNumber
			const operator = calculator.dataset.operator
			if(firstValue){
				if(previousKeyType ==='calculate'){
					firstValue = displayedNumber
					secondValue = calculator.dataset.modValue
				}
				screen.textContent = calculate(firstValue, operator, secondValue)
			}
			calculator.dataset.modValue = secondValue
			calculator.dataset.previousKeyType = 'calculate'
		  }
		if(!action){
			if(displayedNumber === '0' || previousKeyType === 'operator'){
				screen.textContent = keyContent
			}
			else{
				screen.textContent = displayedNumber + keyContent
			}
			calculator.dataset.previouKey = 'number'
		}
	
		Array.from(key.parentNode.children).forEach(i => i.classList.remove('is-depressed'))

	}
})
