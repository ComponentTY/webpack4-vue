import a from './src/App.js'

console.log(a)

class A {
    constructor (name, age) {
        this.name = name
        this.age = age
    }
    speak () {
        alert('hello world'+ this.name)
    }
}

const AA = new A('xiaoming', 21);

// AA.speak();

[1,2,3,4].map(item => console.log(item))

new Promise((resolve,reject) => {
    console.log('2222resolve')
    resolve()
}).then(res => {
    console.log('3333resolve')
})

const abc = 'aaaa'

let ccc = 'cccc'

console.log(abc, ccc)