import './Footer.css';
import LinkListWithIcons from '../components/LinkListWithIcons'; 


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
            imgAddresss: 'https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Instagram-512.png'
        },
        {
            name: 'WhatsApp',
            urlAddress: 'https://www.whatsapp.com',
            imgAddresss: 'https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_23-whatsapp-512.png'
        },
        {
            name: 'Facebook',
            urlAddress: 'https://www.facebook.com/respawn.party',
            imgAddresss: 'https://cdn1.iconfinder.com/data/icons/logotypes/32/square-facebook-512.png'
        },
        {
            name: 'YouTube',
            urlAddress: 'https://www.youtube.com/@RespawnParty',
            imgAddresss: 'https://cdn1.iconfinder.com/data/icons/logotypes/32/youtube-512.png'
        },
        {
            name: 'Twitch',
            urlAddress: 'https://www.twitch.com',
            imgAddresss: 'https://cdn2.iconfinder.com/data/icons/social-media-iconez/64/Twitch-512.png'
        },
        {
            name: 'Discord',
            urlAddress: 'https://www.discord.com/respawn.party',
            imgAddresss: 'https://cdn1.iconfinder.com/data/icons/unicons-line-vol-3/24/discord-512.png'
        },
        {
            name: 'TikTok',
            urlAddress: 'https://www.tiktok.com/@respawn.party',
            imgAddresss: 'https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/2840/tiktok-logo-512.png'
        }
  ]
}

  return (
    <footer style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
      <div className="pie">
        <div className="container-fluid pt-4 pb-4">
            <div className="row">
                {/* Columna 1: Logo */}
                <div className="col-12 col-md-3 text-center text-md-start mb-4">
                    <p className="d-flex justify-content-center">
                        <img 
                            className="logoTalentoGames"
                            src="/images/Logo.png" 
                            alt="Logo Talento Games" />
                    </p>
                </div>
              

                {/* Columna 2: Menús de pie de página */}
                <div className="col-12 col-md-9">
                  <div className="row pb-3">
                    {/* Más populares */}
                    <div className="col-12 col-md-3 text-center text-md-start mb-4">
                        <ul className="pie-menu">
                            <li><h6 className="text-nowrap pb-2">Más populares</h6></li>
                            <li className="pb-2">
                                <a  href="/console/21" 
                                    target="_blank"
                                    className="text-nowrap">PlayStation 2</a></li>
                            <li className="pb-2">
                                <a  href="/console/16" 
                                    target="_blank"
                                    className="text-nowrap">Nintendo GameCube</a></li>
                            <li className="pb-2">
                                <a  href="/console/1" 
                                    target="_blank"    
                                    className="text-nowrap">Sega Genesis</a></li>
                        </ul>
                    </div>
                    {/* Columna 3: Nuestras redes sociales */}
                    <div className="col-12 col-md-3 text-center text-md-start">
                      <LinkListWithIcons 
                        title={footerContent.title} 
                        socialMedia={footerContent.links} 
                        listaEstilos="pie-menu-redes"
                        iconosEstilos={iconosEstilos}/>
                    </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </footer>
  );
}

export default Footer;
