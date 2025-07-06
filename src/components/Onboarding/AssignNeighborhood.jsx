import { useNavigate } from 'react-router'

const AssignNeighborhood = () => {

    const navigate = useNavigate()

    // todo - cant let anyone navigate to dashboard

    return (
        <>
            <h1>Let's Figure out your neighborhood</h1>
            <button onClick={() => navigate('/dashboard')}>done</button>
        </>
    )

}

export default AssignNeighborhood