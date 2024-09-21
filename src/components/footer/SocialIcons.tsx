import React from 'react';

interface SocialIconProps {
  src: string;
  alt: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ src, alt }) => (
  <img loading="lazy" src={src} className="object-contain shrink-0 w-6 aspect-square" alt={alt} />
);

const SocialIcons: React.FC = () => {
  const icons = [
    { src: "/img/Facebook.svg", alt: "Social media icon 1" },
    { src: "/img/Twitter.svg", alt: "Social media icon 2" },
    { src: "/img/Instagram.svg", alt: "Social media icon 3" },
    { src: "/img/Youtube.svg", alt: "Social media icon 4" }
  ];

  return (
    <div className="flex gap-10 items-start">
      {icons.map((icon, index) => (
        <SocialIcon key={index} src={icon.src} alt={icon.alt} />
      ))}
    </div>
  );
};

export default SocialIcons;