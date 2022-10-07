const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 250
canvas.height = 250

let graphin = document.getElementById('graphin')
let ctxin = graphin.getContext('2d')
graphin.width = 500
graphin.height = 500

let graphout = document.getElementById('graphout')
let ctxout = graphout.getContext('2d')
graphout.width = 500
graphout.height = 500

let activation = (a) => a

class Link {
	constructor(from_layer, from_tag, weight) {
		this.from_layer = from_layer
		this.from_tag = from_tag
		this.weight = weight
	}
}

class InputNode {
	constructor(tag, value) {
		this.tag = tag
		this.out = value
		this.x = 10
		this.y = (this.tag * 20) + 20
	}

	draw() {
		ctx.beginPath()
		ctx.fillStyle = `rgb(${this.out * 100}, ${this.out * 100}, ${this.out * 100})`
		ctx.arc(this.x, this.y, 5, 0, Math.PI * 2)
		ctx.fillText(this.out, this.x, this.y + 100)
		ctx.fill()
	}
}

class HiddenNode {
	constructor(layer, tag, inputs) {
		this.layer = layer
		this.tag = tag
		this.inputs = inputs
		this.bias = 0
		this.out
		this.x = this.layer * 30 + 60
		this.y = this.tag * 20 + 20
	}

	calcOutput() {
		let temp = 0
		for (let i = 0; i < this.inputs.length; i++) {
			if (this.inputs[i].from_layer == 'i') {
				temp += inputNodes[this.inputs[i].from_tag].out * this.inputs[i].weight
			} else {
				temp += hiddenNodes[this.inputs[i].from_layer][this.inputs[i].from_tag].out * this.inputs[i].weight
			}
		}
		// console.log(activation(temp + this.bias))
		this.out = activation(temp + this.bias)
	}

	draw() {
		// debugger
		ctx.beginPath()
		ctx.fillStyle = `rgb(${this.out * 100}, ${this.out * 100}, ${this.out * 100})`
		ctx.arc(this.x, this.y, 5, 0, Math.PI * 2)
		ctx.fillText(this.out, this.x, this.y + 100)
		ctx.fill()
		for (let i = 0; i < this.inputs.length; i++) {
			ctx.strokeStyle = `rgb(${this.inputs[i].weight * 100}, ${this.inputs[i].weight * 100}, ${this.inputs[i].weight * 100})`
			if (this.inputs[i].from_layer == 'i') {
				ctx.beginPath()
				ctx.moveTo(inputNodes[this.inputs[i].from_tag].x, inputNodes[this.inputs[i].from_tag].y)
				ctx.lineTo(this.x, this.y)
				ctx.stroke()
			} else {
				ctx.beginPath()
				ctx.moveTo(hiddenNodes[this.inputs[i].from_layer][this.inputs[i].from_tag].x, hiddenNodes[this.inputs[i].from_layer][this.inputs[i].from_tag].y)
				ctx.lineTo(this.x, this.y)
				ctx.stroke()
			}
		}

	}
}

class OutputNode {
	constructor(tag, inputs, bias) {
		this.tag = tag
		this.inputs = inputs
		this.x = 90 + hiddenNodes.length * 30
		this.y = this.tag * 20 + 20
		this.bias = bias
	}

	calcOutput() {
		// debugger
		let temp = 0
		for (let i = 0; i < this.inputs.length; i++) {
			if (this.inputs[i].from_layer == 'i') {
				temp += inputNodes[this.inputs[i].from_tag].out * this.inputs[i].weight
			} else {
				temp += hiddenNodes[this.inputs[i].from_layer][this.inputs[i].from_tag].out * this.inputs[i].weight
				// console.log(this.inputs[i].from_layer)
			}
		}
		// console.log(activation(temp + this.bias))
		this.out = activation(temp + this.bias)
	}

	draw() {
		// debugger
		ctx.beginPath()
		ctx.fillStyle = `rgb(${this.out}, ${this.out}, ${this.out})`
		ctx.arc(this.x, this.y, 5, 0, Math.PI * 2)
		ctx.fillText(this.out, this.x, this.y + 100)
		ctx.fill()
		ctx.beginPath()
		for (let i = 0; i < this.inputs.length; i++) {
			ctx.fillStyle = `rgb(${this.inputs[i].weight * 100}, ${this.inputs[i].weight * 100}, ${this.inputs[i].weight * 100})`
			ctx.beginPath()
			ctx.moveTo(hiddenNodes[hiddenNodes.length - 1][this.inputs[i].from_tag].x, hiddenNodes[hiddenNodes.length - 1][this.inputs[i].from_tag].y)
			ctx.lineTo(this.x, this.y)
			ctx.strokeStyle = `rgb(${hiddenNodes[hiddenNodes.length - 1][this.inputs[i].from_tag].weight/(100/255)}, ${hiddenNodes[hiddenNodes.length - 1][this.inputs[i].from_tag].weight/(100/255)}, ${hiddenNodes[hiddenNodes.length - 1][this.inputs[i].from_tag].weight/(100/255)})`
			ctx.stroke()
		}
	}
}

let inputNodes = [
	new InputNode(0, 1),
	new InputNode(1, 1)
]
let hiddenNodes = [
	[
		new HiddenNode(0, 0, [new Link('i', 0, 1), new Link('i', 1, 1)]),
		new HiddenNode(0, 1, [new Link('i', 0, 1), new Link('i', 1, 1)])
	]
]
let outputNodes = [
	new OutputNode(0, [new Link(0, 0, 1), new Link(0, 1, 1)], 0),
	new OutputNode(1, [new Link(0, 0, 1), new Link(0, 1, 1)], 0)
]
///////////////////
function Calculate() {
	// console.log('gone')
	for (let i = 0; i < hiddenNodes.length; i++) {
		for (let j = 0; j < hiddenNodes[i].length; j++) {
			hiddenNodes[i][j].calcOutput()
		}
		// console.log('')
	}

	for (let i = 0; i < outputNodes.length; i++) {
		outputNodes[i].calcOutput()
	}

}
/////////////////
function Draw() {
	for (let i = 0; i < inputNodes.length; i++) {
		inputNodes[i].draw()
	}
	for (let i = 0; i < hiddenNodes.length; i++) {
		for (let j = 0; j < hiddenNodes[i].length; j++) {
			hiddenNodes[i][j].draw()
		}
	}
	for (let i = 0; i < outputNodes.length; i++) {
		outputNodes[i].draw()
	}
}

function Graph(ctx, x, y, out, c, r) {
	ctx.beginPath()
	// console.log('c', x, -y)
	ctx.fillStyle = c
	// ctx.arc(x+250, -y+250, r, 0, Math.PI*2)
	// ctx.rect((x+250)-r, (y+250)-r, (x+250)+r, (y+250)+r)
	ctx.fillRect((x+250)-r, (y+250)-r, (x)+r, (y)+r)
	
	// if (out) {
	// 	outx.push(x)
	// 	outy.push(y)
	// }
}

let x = [-50, -40, -30, -20, -10, 00, 10, 20, 30, 40, 50]
let y = [-50, -40, -30, -20, -10, 00, 10, 20, 30, 40, 50]

let outx = []
let outy = []

window.onload = () => {

	/////////////////////////////////////////////////////////////////////////////////////////
	let w_sliders = []
	
	for (let i=0;i<hiddenNodes.length;i++) {
		w_sliders.push([])
		for (let j=0;j<hiddenNodes[i].length;j++) {
			for (let k=0;k<hiddenNodes[i][j].inputs.length;k++) {
				w_sliders[i].push('w'+i.toString()+j.toString()+k.toString())
				// console.log('w'+i.toString()+j.toString()+k.toString())
			}
		}
	}
	w_sliders.push([])
	for (let i=0;i<outputNodes.length;i++) {
		for (let j=0;j<outputNodes[i].inputs.length;j++) {
			w_sliders[w_sliders.length-1].push('w'+hiddenNodes.length.toString()+i.toString()+j.toString())
			// console.log('w'+hiddenNodes.length.toString()+i.toString()+j.toString())
			// console.log(hiddenNodes.length.toString())
		}
	}
	
	// console.log(w_sliders)
	slidersHTML = document.getElementById('w_sliders')
	for (let i=0; i<w_sliders.length;i++) {
		linkHTML = document.createElement('ul')
		linkHTML.setAttribute('id', w_sliders[i][0].match(/.{1,2}/g)[0])
		// console.log(slidersHTML)
		slidersHTML.appendChild(document.createTextNode(w_sliders[i][0].match(/.{1,2}/g)[0]))
		slidersHTML.appendChild(linkHTML)
		for (let j=0; j<w_sliders[i].length;j++) {
			sliderLi = document.createElement('li')
			slider = document.createElement('input')
			sliderout = document.createElement('div')
			slider.setAttribute('type', 'range')
			slider.setAttribute('max', '100')
			slider.setAttribute('min', '-100')
			slider.setAttribute('value', '1')
			slider.setAttribute('id', w_sliders[i][j])
			sliderout.setAttribute('id', 'o'+w_sliders[i][j])
			sliderout.appendChild(document.createTextNode('1'))
			sliderLi.appendChild(slider)
			sliderLi.appendChild(sliderout)
			linkHTML.appendChild(sliderLi)
		}
	}
	
	for (let i=0; i<w_sliders.length;i++) {
		for (let j=0; j<w_sliders[i].length;j++) {
			
			document.getElementById(w_sliders[i][j]).addEventListener('input', () => {
				document.getElementById('o'+w_sliders[i][j]).innerHTML = document.getElementById(w_sliders[i][j]).value
				signals = w_sliders[i][j].split('')
				// console.log(signals)
				switch (signals[0]) {
					case 'w':
						if (signals[1] == hiddenNodes.length) {
							outputNodes[parseInt(signals[2])].inputs[parseInt(signals[3])].weight = document.getElementById(w_sliders[i][j]).value
						} else {
							hiddenNodes[parseInt(signals[1])][parseInt(signals[2])].inputs[parseInt(signals[3])].weight = document.getElementById(w_sliders[i][j]).value
						}
						// console.log(document.getElementById(w_sliders[i][j]).value)
						// console.log(hiddenNodes[parseInt(signals[1])][parseInt(signals[2])].inputs)//[parseInt(signals[3])])
						
				}
			})
		}
	}

	/////////////////////////////////////////////////////////////////////////////////////////
	let b_sliders = []
	
	for (let i=0;i<hiddenNodes.length;i++) {
		b_sliders.push([])
		// console.log(i)
		for (let j=0;j<hiddenNodes[i].length;j++) {
			b_sliders[b_sliders.length-1].push('b'+i.toString()+j.toString())
		}
	}
	b_sliders.push([])
	for (let i=0;i<outputNodes.length;i++) {
		b_sliders[b_sliders.length-1].push('b'+hiddenNodes.length.toString()+i.toString())
	}
	
	// console.log(b_sliders)
	slidersHTML = document.getElementById('b_sliders')
	for (let i=0; i<b_sliders.length;i++) {
		linkHTML = document.createElement('ul')
		linkHTML.setAttribute('id', b_sliders[i][0].match(/.{1,2}/g)[0])
		// console.log(b_sliders[i])
		slidersHTML.appendChild(document.createTextNode(b_sliders[i][0].match(/.{1,2}/g)[0]))
		slidersHTML.appendChild(linkHTML)
		for (let j=0; j<b_sliders[i].length;j++) {
			sliderLi = document.createElement('li')
			slider = document.createElement('input')
			sliderout = document.createElement('div')
			slider.setAttribute('type', 'range')
			slider.setAttribute('max', '100')
			slider.setAttribute('min', '-100')
			slider.setAttribute('value', '0')
			slider.setAttribute('id', b_sliders[i][j])
			sliderout.setAttribute('id', 'o'+b_sliders[i][j])
			sliderout.appendChild(document.createTextNode('0'))
			sliderLi.appendChild(slider)
			sliderLi.appendChild(sliderout)
			linkHTML.appendChild(sliderLi)
		}
	}
	
	for (let i=0; i<b_sliders.length;i++) {
		for (let j=0; j<b_sliders[i].length;j++) {
			
			document.getElementById(b_sliders[i][j]).addEventListener('input', () => {
				document.getElementById('o'+b_sliders[i][j]).innerHTML = document.getElementById(b_sliders[i][j]).value
				signals = b_sliders[i][j].split('')
				// console.log(signals)
				switch (signals[0]) {
					case 'b':
						if (signals[1] == hiddenNodes.length) {
							outputNodes[parseInt(signals[2])].bias = parseInt(document.getElementById(b_sliders[i][j]).value)
						} else {
							hiddenNodes[parseInt(signals[1])][parseInt(signals[2])].bias = parseInt(document.getElementById(b_sliders[i][j]).value)
						}
						
				}
			})
		}
	}

	//////////////////////////////////////////////////////////////////////////////////////
	
	// console.log((outx))
	// console.log((outy))
	// graph(ctxout, 0, 0)
	// go()
	Loop()
	// alert('loaded')
	console.log('loaded')
	console.log(graphSpace)
}
document.getElementById('functions').addEventListener('input', () => {
	switch (document.getElementById('functions').value) {
		case 'None':
			activation = (a) => a
			break
		case '>0=1':
			activation = (a) => {
				if (a > 0) { return 1 }
				else { return 0 }
			}	
			break
		case 'sigmoid':
			activation = (a) => 1/1+Math.E**-a
			break
				
	}
	document.getElementById('label').innerHTML = activation
})


canvas.addEventListener('click', (event) => {
	// console.log('clicked', event.y)
	for (let i = 0; i < inputNodes.length; i++) {
		// console.log('checked', inputNodes[i].y-5, inputNodes[i].y+5)
		if (event.y > inputNodes[i].y + 5 && event.y < inputNodes[i].y + 15) {
			if (inputNodes[i].out == 0) {
				inputNodes[i].out = 1
			} else {
				inputNodes[i].out = 0
			}
		}
	}
})

let graphSpace = {
	w: parseInt(document.getElementById('x_size').value),
	h: parseInt(document.getElementById('y_size').value),
	x: parseInt(document.getElementById('x_res').value),
	y: parseInt(document.getElementById('y_res').value)
}

document.getElementById('x_size').addEventListener('input', () => {
	graphSpace.w = parseInt(document.getElementById('x_size').value)
	console.log(graphSpace)
})
document.getElementById('y_size').addEventListener('input', () => {
	graphSpace.h = parseInt(document.getElementById('y_size').value)
	console.log(graphSpace)
})
document.getElementById('x_res').addEventListener('input', () => {
	graphSpace.x = parseInt(document.getElementById('x_size').value)
	console.log(graphSpace)
})
document.getElementById('y_res').addEventListener('input', () => {
	graphSpace.y = parseInt(document.getElementById('y_size').value)
	console.log(graphSpace)
})

let runs = 0
function go() {
	// debugger
	// console.log(graphSpace)
	ctxin.clearRect(0, 0, graphin.width, graphin.height)
	ctxout.clearRect(0, 0, graphout.width, graphout.height)
	// document.getElementById('counter').innerHTML = `${runs}/${graphSpace.w*graphSpace.h}`
	for (let i=-graphSpace.w/2; i<(graphSpace.w/2)+1; i+=graphSpace.x) {
		for (let j=-graphSpace.h/2; j<(graphSpace.h/2)+1; j+=graphSpace.y) {
			// runs++
			// document.getElementById('counter').innerHTML = `${runs}/${(graphSpace.w/graphSpace.x)*(graphSpace.h/graphSpace.y)}`
	// for (let i=-100; i<101; i+=10) {
	// 	for (let j=-100; j<101; j+=10) {
			
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			
			inputNodes[0].out = i
			inputNodes[1].out = j
			
			Calculate()
			Draw()
			
			Graph(ctxin, i, j, false, '#000000', graphSpace.x/2)
			// c = ''
			if (outputNodes[0].out > outputNodes[1].out) {
				c = '#ff0000'
			} else if (outputNodes[0].out < outputNodes[1].out) {
				c = '#0000ff'
			} else {
				c = '#555555'
			}
			Graph(ctxout, i, j, false, c, graphSpace.x)
			// console.log(i, j)
			// debugger
		}
	}
	// runs = 0
}

function Loop() {
	
	
	go()
	requestAnimationFrame(Loop)
}