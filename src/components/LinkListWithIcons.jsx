function LinkListWithIcons({ title, socialMedia, listaEstilos, iconosEstilos }) { 
// Le estoy pasando props, asi es reutilizable
// los espacios hay que respetarlos
    
    return (
        <div>
            <h2>{title}</h2>
            <ul style={listaEstilos}>
                {socialMedia.map((social, index) => (
                    <li key={index}>
                        <a href={social.urlAddress} target="_blank" rel="noopener noreferrer">
                            <img 
                                src={social.imgAddresss} 
                                alt={social.name}
                                style={iconosEstilos} />
                            {social.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
// Lo que sea dinamico va en el componente
// Los estilos estaticos van en App.css
export default LinkListWithIcons; // Ahora tengo un componente declarado