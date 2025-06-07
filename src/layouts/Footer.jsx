import './Footer.css';

function Footer() {
    const iconosEstilos = {
        width: '24px',
        height: '24px',
        objectFit: 'contain',
        marginRight: '8px',
        verticalAlign: 'middle',
    };

    const footerContent = {
        title: 'Nuestras redes',
        links: [
            {
                name: 'Instagram',
                urlAddress: 'https://www.instagram.com/respawn.party',
                imgAddresss: '/images/icons/Instagram-512.webp'
            },
            {
                name: 'WhatsApp',
                urlAddress: 'https://www.whatsapp.com',
                imgAddresss: '/images/icons/social_media_applications_23-whatsapp-512.png'
            },
            {
                name: 'Facebook',
                urlAddress: 'https://www.facebook.com/respawn.party',
                imgAddresss: '/images/icons/square-facebook-512.png'
            },
            {
                name: 'YouTube',
                urlAddress: 'https://www.youtube.com/@RespawnParty',
                imgAddresss: '/images/icons/youtube-512.png'
            },
            {
                name: 'Twitch',
                urlAddress: 'https://www.twitch.com',
                imgAddresss: 'https://cdn2.iconfinder.com/data/icons/social-media-iconez/64/Twitch-512.png'
            },
            {
                name: 'Discord',
                urlAddress: 'https://www.discord.com/respawn.party',
                imgAddresss: '/images/icons/discord-512.png'
            },
            {
                name: 'TikTok',
                urlAddress: 'https://www.tiktok.com/@respawn.party',
                imgAddresss: '/images/icons/tiktok-logo-512.png'
            }
        ]
    };

    return (
        <footer style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
            <div className="pie">
                <div className="container-fluid pt-4 pb-4">
                    <div className="row">

                        <div className="col-12 col-md-3 text-center text-md-start mb-4">
                            <p className="d-flex justify-content-center justify-content-md-start">
                                <img
                                    className="logoTalentoGames"
                                    src="/images/Logo.png"
                                    alt="Logo Talento Games"
                                />
                            </p>
                        </div>

                        <div className="col-12 col-md-9">
                            <div className="row pb-3">
                                <div className="col-12 col-md-3 text-center text-md-start mb-4">
                                    <ul className="pie-menu">
                                        <li><h6 className="text-nowrap pb-2">Más populares</h6></li>
                                        <li className="pb-2">
                                            <a href="/console/21" target="_blank" className="text-nowrap">PlayStation 2</a>
                                        </li>
                                        <li className="pb-2">
                                            <a href="/console/16" target="_blank" className="text-nowrap">Nintendo GameCube</a>
                                        </li>
                                        <li className="pb-2">
                                            <a href="/console/1" target="_blank" className="text-nowrap">Sega Genesis</a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-12 col-md-3 mb-4">
                                    <div className="d-flex flex-wrap flex-md-column align-items-center align-items-md-start gap-3">
                                        <h6 className="w-100 text-center text-md-start">Nuestras redes</h6>
                                        {footerContent.links.map((link, index) => (
                                            <a key={index} href={link.urlAddress} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center text-decoration-none">
                                                <img src={link.imgAddresss} alt={link.name} style={iconosEstilos} />
                                                <span className="d-inline">{link.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 text-center py-3">
                    2025 &copy; Diseñado y desarrollado con ❤️ por <a href="https://ar.linkedin.com/in/mmontaldo">Mariela Montaldo</a> para Talento Tech 2025
                </div>
            </div>
        </footer>
    );
}

export default Footer;
