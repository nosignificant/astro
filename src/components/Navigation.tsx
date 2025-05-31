import type { MenuItem } from '../lib/data/menus';
import '../styles/global.css';

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

import React from 'react';
export default function Navigation({ currentPath, Menus }: NavigationProps) {
  return (
    <div>
      <div className="flex flex-row">
        {Menus.map((menu) => (
          <div>
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
      {Menus.map((menu) =>
        slicePath(currentPath) !== menu.url ? (
          <div key={menu.url} className="opacity-0 text-gray-400">
            {menu.description}
          </div>
        ) : null,
      )}
    </div>
  );
}
