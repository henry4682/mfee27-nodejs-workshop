let students=[
    {
        name:'henry',
        age:18
    },
    {
        name:'amy',
        age:20
    }
]
// console.log(student)
students.forEach ( (student) => {
    console.log(student.name)
} )
function p(name){
    console.log(`${name} is a student.`)
}

p(students.name)