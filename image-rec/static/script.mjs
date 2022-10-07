import { labels } from "./labels.mjs";
import { std } from './training_data_sample.mjs'
import { td1 } from './td1.mjs'
import { td2 } from './td2.mjs'
import { td3 } from './td3.mjs'
import { td4 } from './td4.mjs'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 250
canvas.height = 15700

const canvasv = document.getElementById('canvasv')
const ctxv = canvasv.getContext('2d')
canvasv.width = 500
canvasv.height = 15700

const graphin = document.getElementById('graphin')
const ctxin = graphin.getContext('2d')
graphin.width = 500
graphin.height = 500

const graphout = document.getElementById('graphout')
const ctxout = graphout.getContext('2d')
graphout.width = 500
graphout.height = 500

const dataCanvas = document.getElementById('data')
const ctxData = dataCanvas.getContext('2d')
dataCanvas.width = 28
dataCanvas.height = 28

let links = []
let out = []
let split = []


Math.TAU = Math.PI*2

let activation = (a) => a

const digitTarget = [
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	
]

class Link {
	constructor(from_layer, from_tag) {
		this.from_layer = from_layer
		this.from_tag = from_tag
		this.weight = (Math.random()*4)-2
		this.want = []
	}
}

class InputNode {
	constructor(tag) {
		this.tag = tag
		this.activation = 1
		this.x = 10
		this.y = (this.tag * 20) + 20
	}

	draw() {
		ctx.beginPath()
		ctx.fillStyle = `rgb(${this.out * 100}, ${this.out * 100}, ${this.out * 100})`
		ctx.arc(this.x, this.y, 5, 0, Math.PI * 2)
		ctxv.fillText(Math.round(this.activation*100)/100, this.x, this.y)
		ctx.fill()
	}
}

class HiddenNode {
	constructor(layer, tag, inputs) {
		this.layer = layer
		this.tag = tag
		this.inputs = inputs
		this.bias = (Math.random()*20)-10
		this.out = 0
		this.activation
		this.x = this.layer * 30 + 60
		this.y = this.tag * 20 + 20
		this.want = []
		this.ewant
		this.twant = []
	}

	calcOutput() {
		let temp = 0
		for (let i = 0; i < this.inputs.length; i++) {
			if (this.inputs[i].from_layer == 'i') {
				temp += inputNodes[this.inputs[i].from_tag].activation * this.inputs[i].weight
			} else {
				temp += hiddenNodes[this.inputs[i].from_layer][this.inputs[i].from_tag].activation * this.inputs[i].weight
			}
		}
		// console.log(activation(temp + this.bias))
		this.out = temp + this.bias
		this.activation = activation(temp + this.bias)
	}

	draw() {
		// debugger
		ctx.beginPath()
		ctx.fillStyle = `rgb(${this.out * 100}, ${this.out * 100}, ${this.out * 100})`
		ctx.arc(this.x, this.y, 5, 0, Math.PI * 2)
		ctxv.fillText(Math.round(this.out*100)/100, this.x, this.y)
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
	constructor(tag, inputs) {
		this.tag = tag
		this.inputs = inputs
		this.x = 90 + hiddenNodes.length * 30
		this.y = this.tag * 20 + 20
		this.bias = (Math.random()*20)-10
		this.want = []
	}

	calcOutput() {
		// debugger
		let temp = 0
		for (let i = 0; i < this.inputs.length; i++) {
			if (this.inputs[i].from_layer == 'i') {
				temp += inputNodes[this.inputs[i].from_tag].activation * this.inputs[i].weight
			} else {
				temp += hiddenNodes[this.inputs[i].from_layer][this.inputs[i].from_tag].activation * this.inputs[i].weight
				// console.log(this.inputs[i].from_layer)
			}
		}
		// console.log(activation(temp + this.bias))
		this.out = temp + this.bias
		this.activation = activation(temp + this.bias)
	}

	draw() {
		// debugger
		ctx.beginPath()
		ctx.fillStyle = `rgb(${this.out}, ${this.out}, ${this.out})`
		ctx.arc(this.x, this.y, 5, 0, Math.PI * 2)
		ctxv.fillText(Math.round(this.out*100)/100, this.x, this.y)
		ctx.fill()
		ctx.beginPath()
		for (let i = 0; i < this.inputs.length; i++) {
			ctx.fillStyle = `rgb(
				${this.inputs[i].weight * 100}, 
				${this.inputs[i].weight * 100}, 
				${this.inputs[i].weight * 100})`
			ctx.beginPath()
			ctx.moveTo(hiddenNodes[hiddenNodes.length - 1][this.inputs[i].from_tag].x, hiddenNodes[hiddenNodes.length - 1][this.inputs[i].from_tag].y)
			ctx.lineTo(this.x, this.y)
			ctx.strokeStyle = `rgb(
				${this.inputs[i].weight * 100}, 
				${this.inputs[i].weight * 100}, 
				${this.inputs[i].weight * 100})`
			// ctx.strokeStyle = `rgb(
			// 	${hiddenNodes[hiddenNodes.length - 1][this.inputs[i].from_tag].weight/(100/255)}, 
			// 	${hiddenNodes[hiddenNodes.length - 1][this.inputs[i].from_tag].weight/(100/255)}, 
			// 	${hiddenNodes[hiddenNodes.length - 1][this.inputs[i].from_tag].weight/(100/255)}
			// )`
			ctx.stroke()
		}
	}
}

let inputNodes = [
	// new InputNode(0, 1),
	// new InputNode(1, 1)
]
for (let i=0; i<28**2;i++) {
	inputNodes.push(new InputNode(i))
}

let hiddenNodes = [
	[
		// new HiddenNode(0, 0, [new Link('i', 0, 1), new Link('i', 1, 1)]),
		// new HiddenNode(0, 1, [new Link('i', 0, 1), new Link('i', 1, 1)])
	],
	[]
]
for (let i=0;i<16;i++) {
	
	links = []
	for (let j=0;j<inputNodes.length;j++) {
		links.push(new Link('i', j))
	}
	hiddenNodes[0].push(new HiddenNode(0, i, links))
	// debugger
	links = []
	for (let j=0;j<16;j++) {
		links.push(new Link(0, j))
	}
	hiddenNodes[1].push(new HiddenNode(1, i, links))
}
let outputNodes = [
	// new OutputNode(0, [new Link(0, 0, 1), new Link(0, 1, 1)], 0),
	// new OutputNode(1, [new Link(0, 0, 1), new Link(0, 1, 1)], 0)
]
for (let i=0;i<10;i++) {
	links = []
	for (let j=0;j<hiddenNodes[hiddenNodes.length-1].length;j++) {
		links.push(new Link(hiddenNodes.length-1, j))
	}
	outputNodes.push(new OutputNode(i, links))
}

console.log(inputNodes)
console.log(hiddenNodes)
console.log(outputNodes)

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
function Draw(label) {
	ctxv.clearRect(0, 0, canvasv.weight, canvasv.height)
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
	let out = outputNodes.map(x => x.out)
	let max = out.reduce((a, b) => Math.max(a, b), -Infinity)
	for (let i = 0; i < out.length; i++) {
		// console.log(out[i], out)
		if (out[i] == max) {
			ctx.beginPath()
			if (i == label) { ctx.fillStyle = '#00aa00' } else { ctx.fillStyle = '#000000' }
			console.log(i, label)
			ctx.arc(100 + hiddenNodes.length * 30, outputNodes[i].y, 3, 0, Math.TAU)
			// console.log(100 + hiddenNodes.length * 30, outputNodes[i].y, 3, 0, Math.TAU)
			ctx.fill()
		}
		
	}
	
}
/////////////////////
function Cost(output, target) {
	// debugger
	let cost = 0
	for (let i=0;i<target.length; i++) {
		cost += (output[i] - target[i])**2
	}
	return cost
}
/////////////////////
function Desires(out, target) {
	let e = Cost(out, target)
	let a, w, l, sum
	let diff = []
	for (let i=0; i<target.length; i++) {
		diff.push(target[i] - out[i])
	}
	///
	for (let i=0; i<outputNodes.length; i++) {
		outputNodes[i].want.push(diff[i]/1000)
		l = outputNodes[i].inputs
		for (let j=0; j<l.length; j++) {
			l[j].want.push(diff[i]/1000)
			hiddenNodes[1][j].twant.push((diff[i]/1000)*l[j].weight)
			hiddenNodes[1][j].ewant = (diff[i]/1000)*l[j].weight
		}		
	}
	///
	for (let i=0; i<hiddenNodes[1].length; i++) {
		sum = 0
		for (let j=0; j<hiddenNodes[1][i].twant.length; j++) {
			sum += hiddenNodes[1][i].twant[j]
		}
		hiddenNodes[1][i].want.push(sum/hiddenNodes[1][i].twant.length)
		hiddenNodes[1][i].twant = []
		l = hiddenNodes[1][i].inputs
		for (let j=0; j<l.length; j++) {
			l[j].want.push(hiddenNodes[1][i].ewant)
			hiddenNodes[0][j].twant.push((hiddenNodes[1][i].ewant)*l[j].weight)
			hiddenNodes[0][j].ewant = (hiddenNodes[1][i].ewant)*l[j].weight
		}
		
	}
	///
	for (let i=0; i<hiddenNodes[0].length; i++) {
		sum = 0
		for (let j=0; j<hiddenNodes[0][i].twant.length; j++) {
			sum += hiddenNodes[0][i].twant[j]
		}
		hiddenNodes[0][i].want.push(sum/hiddenNodes[0][i].twant.length)
		hiddenNodes[0][i].twant = []
		l = hiddenNodes[0][i].inputs
		for (let j=0; j<l.length; j++) {
			l[j].want.push(hiddenNodes[0][i].ewant)
		}		
	}
	///
}
/////////////////////

function dataDraw(out, label, cost) {
	let target = digitTarget[label]
	for (let i=0;i<target.length;i++) {
		ctxv.fillText(target[i], 200, 20*i+20)
		ctxv.fillText(Math.round((out[i] - target[i])*100)/100, 250, 20*i+20)
		ctxv.fillText(Math.round(((out[i] - target[i])**2)*100)/100, 300, 20*i+20)
	}
	ctxv.fillText(Math.round((cost)*100)/100, 350, 20)
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
//////////////////////////

let outx = []
let outy = []


window.onload = () => {
	// debugger
	let data = td1.concat(td2.concat(td3.concat(td4)))
	console.log(data.length)
	for (let i=0; i<data.length; i+=10) {
		split.push(data.slice(i, i+10))
	}
	console.log(split)
	///////////
	Loop()
	// alert('loaded')
	// console.log('loaded')
	// console.log(graphSpace)
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
	// for (let e=0; e<split.length; e++) {
	// 	Epoch(e, split[e])
	// 	console.log(`Epoch ${e} Done`)
	// }
	console.log(split)
	Epoch(0, split[0])
	
}
function Epoch(e, chunk) {
	for (let r=0; r<chunk.length; r++) {
		Run(r, chunk[r])
		console.log(`Set ${r} Done`)
	}
	EpochEnd()
}
function EpochEnd() {
	
}
function Run(r, pair) {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			
			for (let i=0; i<pair[1].length; i++) {
				inputNodes[i].activation = pair[1][i]
			}
			Calculate()
			Draw(digitTarget[pair[0]])

			let out = outputNodes.map(x => x.activation)
			let cost = Cost(out, digitTarget[pair[0]])
			console.log(cost)

			dataDraw(out, pair[0], cost)

			Desires(out, digitTarget[pair[0]])
}
function Loop() {
	go()
	// requestAnimationFrame(Loop)
}