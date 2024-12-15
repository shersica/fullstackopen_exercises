
const Person = ({person, removePerson}) => {
    return (
        <>
            <li>{person.name} {person.number}</li>
            <button onClick={removePerson}>delete</button>
        </>
    )
}

export default Person