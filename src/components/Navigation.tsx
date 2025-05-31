import type { MenuItem } from '../lib/data/menus';
import '../styles/global.css';
import React, { useState, useEffect } from 'react';

interface NavigationProps {
  currentPath: string;
  Menus: MenuItem[];
}

function slicePath(currentPath): string {
  const slash: string[] = currentPath.split('/');
  const slashCount: number = slash.length - 1;
  if (slashCount > 1) return '/' + slash[1];
  else return currentPath;
}

export default function Navigation({ currentPath, Menus }: NavigationProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  useEffect(() => {
    console.log('hovered changed:', hovered);
  }, [hovered]);

  return (
    <div>
      <div className="flex flex-row">
        {Menus.map((menu) => (
          <div
            key={menu.url}
            onMouseEnter={(e) => {
              setHovered(menu.description);
            }}
            onMouseLeave={() => setHovered('')}
          >
            <div className="pr-4">
              <div
                className={
                  slicePath(currentPath) === menu.url
                    ? 'headmenu'
                    : 'group text-gray-400'
                }
              >
                <a href={menu.url}>{menu.name}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-gray-500 min-h-[2rem]">{hovered || ''}</div>
    </div>
  );
}

//href={menu.url}
