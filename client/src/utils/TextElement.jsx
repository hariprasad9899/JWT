export default function TextElement(props) {
    const textElementStyle = {
        fontSize: '1rem',
        color: '#9E9FA5',
        fontFamily: `'Roboto', sans-serif`,
    }

    return <p style={textElementStyle}>{props.children}</p>
}
