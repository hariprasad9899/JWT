export default function HeadingElement(props) {
    const headingElementStyle = {
        color: '#9E9FA5',
        color: '#FF6969',
    }

    return <h3 style={headingElementStyle}>{props.children}</h3>
}
