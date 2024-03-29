import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconName } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';

import { getResolvedImg } from '../../utils/utils';

import './Button.scss';

interface IProps {
  text: string;
  icon?: IconName;
  image?: string;
  href: string;
  target?: string;
  category?: boolean;
  excerpt?: {
    isExcerpt: boolean;
    text: string;
  };
  parent?: {
    title: string;
    slug: string;
    id: string | null;
    image: string;
  };
}

const ButtonLink: React.FunctionComponent<IProps> = ({
  text,
  icon,
  image,
  href,
  target = '_self',
  excerpt,
  parent,
}) => {
  const [parentImage, setParentImage] = useState<string | null>(null);

  useEffect(() => {
    if (parent?.image) getResolvedImg(parent?.id as string, 120).then((path) => setParentImage(path as string));
  }, [parent]);

  return (
    <div
      className={cx('button button__excerpt__parent', {
        button__excerpt: excerpt && excerpt.isExcerpt,
      })}
    >
      <a
        href={href}
        target={target}
        className="flex__wrapper h4 info__link"
        rel={target === '_blank' ? 'noopener nofollow noreferrer' : undefined}
      >
        {image && <img src={image} alt={text} className="button__image" />}
        <div className="button__excerpt__title">{text}</div>
        {icon && <FontAwesomeIcon icon={icon} className={cx('button__icon')} />}
      </a>

      {parent && (
        <div className="flex__wrapper parent__link">
          <p>
            Part of
            <Link to={`/pages/${parent.slug}`}> {parent.title}</Link>
          </p>

          {parent?.image && parentImage && (
            <img alt={parent.title ? parent.title : ''} className="image" src={parentImage} />
          )}
        </div>
      )}
    </div>
  );
};

export default ButtonLink;
