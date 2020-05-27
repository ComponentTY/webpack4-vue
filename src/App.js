import './App.css'
import './App.scss'
var a = '11111'
var div = document.createDocumentFragment()
const oDiv = document.createElement('div')
const oP = document.createElement('p')
oDiv.innerHTML = 'oDiv hello world'
oP.innerHTML = 'oP hello oDiv'
oDiv.appendChild(oP)
div.appendChild(oDiv)
document.body.appendChild(div)
export default a