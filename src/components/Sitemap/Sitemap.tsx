import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './Sitemap.scss';

type SitemapProps = {
  id: string;
  filename: string;
  slug: string;
  children: SitemapProps[] | null;
};

const Sitemap: React.FC<{ list: SitemapProps; activeBranch?: any }> = ({ list, activeBranch }) => {
  const [open, setOpen] = useState(true);
  const [height, setHeight] = useState(true);
  const [activePath, setActivePath] = useState<any>(undefined);
  const ref = useRef<any>(null);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, []);

  // we need to set the state again here as the recursion looses tracking of what we can check against for being active
  useEffect(() => {
    if (activeBranch && activeBranch.length) {
      setActivePath(activeBranch);
    }
  }, [activeBranch]);

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    const target = e.target as Element;
    if (id !== target.parentElement!.getAttribute('data-id')) return;
    setOpen((prev) => !prev);
  };

  const handleSubsequentUls = (list.children || []).map((list: SitemapProps) => {
    const isActive = activePath && activePath.find((item:any) => item === list.id)

    if (list.children === null)
      return (
        <ul key={list.id}>
          <li className={`leaf ${isActive ? 'active-branch' : ''}`}>
            <Link to={`/pages/${list.slug}`}>{list.filename}</Link>
          </li>
        </ul>
      );
    return <Sitemap key={list.id} list={list} activeBranch={activeBranch} />;
  });

  const isActive = activePath && activePath.find((item:any) => item === list.id)

  return (
    <ul
      {...(!open && { style: { height: `${height}px` } })}
      className={`list ${open ? 'open' : ''}`}
    >
      {list.children ? (
        <li ref={ref} data-id={list.id} className={`${isActive ? 'active-branch' : ''}`}>
          <div className="toggler" onClick={(e) => handleOnClick(e, list.id)}>
            {open ? '[-]' : '[+]'}
          </div>
          <Link to={`/pages/${list.slug}`}>{list.filename}</Link>
        </li>
      ) : (
        <li ref={ref} data-id={list.id}>
          <Link to={`/pages/${list.slug}`}>{list.filename}</Link>
        </li>
      )}
      {handleSubsequentUls}
    </ul>
  );
};

export default Sitemap;
