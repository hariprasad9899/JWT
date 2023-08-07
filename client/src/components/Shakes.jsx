import '../styles/Shakes.scss'

export default function Shakes() {
    const shakeTypes = ['Milkshake', 'Chocolate Shake', 'Banana Shake']

    return (
        <div className='shake-page'>
            <ul>
                {shakeTypes.map((item, index) => {
                    return <li key={index}>{item}</li>
                })}
            </ul>
        </div>
    )
}
