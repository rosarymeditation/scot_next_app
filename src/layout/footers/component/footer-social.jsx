const social_share = [
    { link: facebookUrl, target: '_blank', icon: 'icon-facebook', color: 'color-fb' },
    { link: twitterUrl, target: '_blank', icon: 'icon-twitter', color: 'color-twitter' },
    { link: linkedInUrl, target: '_blank', icon: 'icon-linkedin2', color: 'color-linkd' },
    { link: youtubeUrl, target: '_blank', icon: 'icon-youtube', color: 'color-yt' },
    { link: instagramUrl, target: '_blank', icon: 'icon-instagram', color: 'color-ig' },
]

import React from 'react';
import { facebookUrl, linkedInUrl, twitterUrl } from '../../headers/menu-data';
import { youtubeUrl } from '../../headers/menu-data';
import { instagramUrl } from '../../headers/menu-data';

const FooterSocial = () => {
    return (
        <>
            {social_share.map((social, i) => (
                <li key={i}><a href={social.link} target={social.target ? social.target : ''} className={`${social.color}`}>
                <i className={social.icon}></i>
                </a></li>
            ))}
        </>
    )
}

export default FooterSocial;