import React from 'react'

const Header = ({ name }) => (
  <h1>
    {name}
  </h1>
)

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
)

const Content = ({ course }) => course.parts.map(part =>
  <Part key={part.id} part={part.name} exercises={part.exercises} />
)

const Total = ({ course }) => (
  <p>Number of exercises {course.parts.reduce((sum, a) => sum + a.exercises, 0)}</p>
)

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default Course
