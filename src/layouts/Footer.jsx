import LinkListWithIcons from '../components/LinkListWithIcons'; // Asegurate de que el path sea correcto

function Footer() {
  const listaEstilos = {
        textAlign: 'left',
        paddingLeft: '1rem',
        fontSize: '1.1rem',
        listStyleType: 'none',
    };

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
    <nav>
      <LinkListWithIcons title={footerContent.title} socialMedia={footerContent.links} listaEstilos={listaEstilos} iconosEstilos={iconosEstilos}/>
    </nav>
  );
}

export default Footer;
