
const Content = ({course}) => {
    return (
      <>
        {course.parts.map((part, index) => (
          <p key={index}>
            {part.name} {part.exercises}
          </p>
        ))}
      </>
    )
  }
  

export default Content